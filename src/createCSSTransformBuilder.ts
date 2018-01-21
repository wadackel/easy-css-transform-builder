import invariant = require('invariant');
import {
  transformProperties,
  TransformProp,
  UnitType,
  UnitTypes,
} from './properties';

export type LengthUnit =
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vh'
  | 'vw'
  | 'vmin'
  | 'vmax'
  | 'px'
  | 'mm'
  | 'q'
  | 'cm'
  | 'in'
  | 'pt'
  | 'pc';

export type AngleUnit =
  | 'deg'
  | 'grad'
  | 'rad'
  | 'turn';

export interface Units {
  length: LengthUnit;
  angle: AngleUnit;
}

export type StyleScalarValue = number | string;

export type StyleValue = StyleScalarValue | StyleScalarValue[];

export interface Styles {
  [key: string]: StyleValue;
}

const defaultUnits: Units = {
  length: 'px',
  angle: 'deg',
};

const isArray = (v: any): v is any[] => Array.isArray(v);

const hasProp = (o: object, p: string): boolean => o.hasOwnProperty(p);

const isValidProp = (value: any): boolean => (
  typeof value === 'number' ||
  typeof value === 'string' ||
  isArray(value)
);

const createUnit = (units: Units, unitType: UnitType): string => (
  unitType === UnitTypes.NONE ? '' : units[unitType]
);

const createValue = (value: StyleScalarValue, unit: string): string => (
  typeof value === 'number' ? `${value}${unit}` : value
);

const normalizeValue = (prop: TransformProp, value: any, units: Units) => {
  if (hasProp(prop, 'units')) {
    if (typeof value === 'string') {
      return value;
    }

    const unitTypes = prop.units as UnitType[];

    invariant(isArray(value), `Should be ${prop.name} is a array`);
    invariant(value.length === unitTypes.length, `Should be ${prop.name} is ${unitTypes.length} values.`);

    return unitTypes
      .map((unit: UnitType, i: number) => createValue(value[i], createUnit(units, unit)))
      .join(', ');
  }

  return createValue(value, createUnit(units, prop.unit as UnitType));
};

export const createCSSTransformBuilder = (units: Units = defaultUnits): (styles: Styles) => string => (
  (styles: Styles): string => (
    transformProperties
      .map((prop: TransformProp) => (
        !hasProp(styles, prop.name) || !isValidProp(styles[prop.name])
          ? null
          : `${prop.name}(${normalizeValue(prop, styles[prop.name], units)})`
      ))
      .filter((value: string | null) => value !== null)
      .join(' ')
  )
);
