import test from 'ava';
import { properties } from '../src/properties';

test('properties', (t) => {
  t.deepEqual(properties, [
    'translateX',
    'translateY',
    'translateZ',
    'translate',
    'translate3d',
    'scale',
    'scale3d',
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotate',
    'rotate3d',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY',
    'perspective',
    'matrix',
    'matrix3d',
  ]);
});
