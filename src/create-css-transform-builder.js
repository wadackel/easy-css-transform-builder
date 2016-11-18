import invariant from "invariant";
import { transformProperties, UnitTypes } from "./properties";


const defaultUnits = {
  length: "px",
  angle: "deg"
};

const isArray = value => Array.isArray(value);

const hasProp = (o, p) => o.hasOwnProperty(p);

const isValidProp = value =>
  typeof value === "number" ||
  typeof value === "string" ||
  isArray(value);

const createUnit = (units, unit) => unit === UnitTypes.NONE ? "" : units[unit];

const createValue = (value, unit) => typeof value === "number" ? `${value}${unit}` : value;

const normalizeValue = (prop, value, units) => {
  if (hasProp(prop, "units")) {
    if (typeof value === "string") {
      return value;
    }

    invariant(isArray(value), `Should be ${prop.name} is a array`);
    invariant(value.length === prop.units.length, `Should be ${prop.name} is ${prop.units.length} values.`);

    return prop.units
      .map((unit, i) => createValue(value[i], createUnit(units, unit)))
      .join(", ");
  }

  return createValue(value, createUnit(units, prop.unit));
};

const createCSSTransformBuilder = (units = defaultUnits) => {
  return styles => {
    return transformProperties
      .map(prop =>
        !hasProp(styles, prop.name) || !isValidProp(styles[prop.name])
          ? null
          : `${prop.name}(${normalizeValue(prop, styles[prop.name], units)})`
      )
      .filter(value => value != null)
      .join(" ");
  };
};


export default createCSSTransformBuilder;
