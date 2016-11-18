export const UnitTypes = {
  NONE: "none",
  LENGTH: "length",
  ANGLE: "angle"
};


export const transformProperties = [
  { name: "translateX",  unit : UnitTypes.LENGTH },
  { name: "translateY",  unit : UnitTypes.LENGTH },
  { name: "translateZ",  unit : UnitTypes.LENGTH },
  { name: "translate",   units: [UnitTypes.LENGTH, UnitTypes.LENGTH] },
  { name: "translate3d", units: [UnitTypes.LENGTH, UnitTypes.LENGTH, UnitTypes.LENGTH] },
  { name: "scale",       unit : UnitTypes.NONE },
  { name: "scale3d",     units: [UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE] },
  { name: "scaleX",      unit : UnitTypes.NONE },
  { name: "scaleY",      unit : UnitTypes.NONE },
  { name: "scaleZ",      unit : UnitTypes.NONE },
  { name: "rotate",      unit : UnitTypes.ANGLE },
  { name: "rotate3d",    units: [UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE, UnitTypes.ANGLE] },
  { name: "rotateX",     unit : UnitTypes.ANGLE },
  { name: "rotateY",     unit : UnitTypes.ANGLE },
  { name: "rotateZ",     unit : UnitTypes.ANGLE },
  { name: "skewX",       unit : UnitTypes.ANGLE },
  { name: "skewY",       unit : UnitTypes.ANGLE },
  { name: "perspective", unit : UnitTypes.LENGTH },
  {
    name: "matrix",
    units: [
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE,
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE
    ]
  },
  {
    name: "matrix3d",
    units: [
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE,
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE,
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE,
      UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE, UnitTypes.NONE
    ]
  }
];


const properties = transformProperties.map(prop => prop.name);


export default properties;
