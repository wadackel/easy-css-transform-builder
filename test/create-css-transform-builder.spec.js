/* eslint-disable no-dupe-keys */
import assert from "power-assert";


const defaultUnits = {
  length: "px",
  angle: "deg"
};

const transformProps = [
  { name: "translateX", unit: "length" },
  { name: "translateY", unit: "length" },
  { name: "translateZ", unit: "length" },
  { name: "skew", unit: "angle" },
  { name: "skewX", unit: "angle" },
  { name: "skewY", unit: "angle" },
  { name: "scale" },
  { name: "scaleX" },
  { name: "scaleY" },
  { name: "scaleZ" },
  { name: "rotate", unit: "angle" },
  { name: "rotateX", unit: "angle" },
  { name: "rotateY", unit: "angle" }
];

function isTransformProp(propName) {
  return transformProps.some(o => o.name === propName);
}

function transform(styles, units = defaultUnits) {
  const array = [];

  transformProps.forEach(prop => {
    if (styles.hasOwnProperty(prop.name) && typeof styles[prop.name] !== "undefined") {
      const value = isNaN(styles[prop.name]) ? 0 : styles[prop.name];
      array.push(`${prop.name}(${value}${prop.hasOwnProperty("unit") ? units[prop.unit] : ""})`);
    }
  });

  return array.join(" ");
}

function buildStyles(styles, units = defaultUnits) {
  const newStyles = {};
  const transformStyles = {};

  Object.keys(styles).forEach((key, value) => {
    if (isTransformProp(key)) {
      transformStyles[key] = value;
    } else {
      newStyles[key] = value;
    }
  });

  const transformValue = transform(transformStyles, units);

  if (transformValue !== "") {
    newStyles.transform = transformValue;
  }

  return newStyles;
}


describe("styleHelpers", () => {
  describe("transform()", () => {
    it("basic", () => {
      assert(transform({ translateX: 30 }) === "translateX(30px)");
      assert(transform({ translateX: 30, translateX: 50 }) === "translateX(50px)", "Override duplicate key");

      assert(transform({
        scaleZ: 0.8,
        rotate: 20,
        scaleY: 2,
        translateY: 50
      }) ===
        "translateY(50px) scaleY(2) scaleZ(0.8) rotate(20deg)",
        "order"
      );

      assert(transform({
        translateX: 200,
        translateY: 300,
        translateZ: 400,
        skew: 300,
        skewX: 20,
        skewY: 82,
        scale: 0.2,
        scaleX: 1.9,
        scaleY: 3.14,
        scaleZ: 8888.1111,
        rotate: 30.2,
        rotateX: 52.9,
        rotateY: 360
      }) ===
        [
          "translateX(200px)",
          "translateY(300px)",
          "translateZ(400px)",
          "skew(300deg)",
          "skewX(20deg)",
          "skewY(82deg)",
          "scale(0.2)",
          "scaleX(1.9)",
          "scaleY(3.14)",
          "scaleZ(8888.1111)",
          "rotate(30.2deg)",
          "rotateX(52.9deg)",
          "rotateY(360deg)"
        ].join(" "),
        "Support all properties"
      );
    });

    it("change units", () => {
      assert(transform({
        translateX: 200,
        translateY: 300,
        translateZ: 400,
        skew: 300,
        skewX: 20,
        skewY: 82,
        scale: 0.2,
        scaleX: 1.9,
        scaleY: 3.14,
        scaleZ: 8888.1111,
        rotate: 30.2,
        rotateX: 52.9,
        rotateY: 360
      }, {
        length: "em",
        angle: "rad"
      }) ===
        [
          "translateX(200em)",
          "translateY(300em)",
          "translateZ(400em)",
          "skew(300rad)",
          "skewX(20rad)",
          "skewY(82rad)",
          "scale(0.2)",
          "scaleX(1.9)",
          "scaleY(3.14)",
          "scaleZ(8888.1111)",
          "rotate(30.2rad)",
          "rotateX(52.9rad)",
          "rotateY(360rad)"
        ].join(" ")
      );
    });

    it("string value", () => {
      // assert(transform({ rotate: "transform" }));
    });
  });
});
