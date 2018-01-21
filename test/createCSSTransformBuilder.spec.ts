import test from 'ava';
import { createCSSTransformBuilder as factory } from '../src/createCSSTransformBuilder';

test('invalid values', (t) => {
  t.is((factory() as any)({
    translateX: null,
    translateY: false,
    rotate: {},
  }), '');
});

test('number values', (t) => {
  const builder = factory();

  t.is(builder({
    translateX: 30,
  }), 'translateX(30px)');

  t.is(builder({
    skewX: 45,
    translateZ: 540,
    scaleX: 3.2,
  }), 'translateZ(540px) scaleX(3.2) skewX(45deg)');

  t.is(builder({
    scale: 4.1010000,
  }), 'scale(4.101)');

  t.is(builder({
    translateX: 350.25,
    translateY: -89.76,
    translateZ: 75,
    scale: 5,
    scaleX: 4.89,
    scaleY: 3.14,
    scaleZ: 65,
    rotate: 590,
    rotateX: 180.75,
    rotateY: -54,
    rotateZ: 0,
    skewX: 28.91,
    skewY: 59.110,
    perspective: 500.25,
  }), [
    'translateX(350.25px)',
    'translateY(-89.76px)',
    'translateZ(75px)',
    'scale(5)',
    'scaleX(4.89)',
    'scaleY(3.14)',
    'scaleZ(65)',
    'rotate(590deg)',
    'rotateX(180.75deg)',
    'rotateY(-54deg)',
    'rotateZ(0deg)',
    'skewX(28.91deg)',
    'skewY(59.11deg)',
    'perspective(500.25px)',
  ].join(' '));
});

test('array values', async (t) => {
  const builder = factory();
  let err: Error;

  err = await t.throws(() => {
    builder({ rotate3d: 100 });
  });
  t.true(/Should be rotate3d is a array/.test(err.message));

  err = await t.throws(() => {
    builder({ translate: [1.20] });
  });
  t.true(/Should be translate is 2 values/.test(err.message));

  t.is(builder({
    translate3d: [420, -92.91, 90],
  }), 'translate3d(420px, -92.91px, 90px)');

  t.is(builder({
    translate: [40, 50.2],
    translate3d: [18.2, 100.05, 5.2],
    scale3d: [1.8, 2.1, 6],
    rotate3d: [49, 21.23, -92, 180],
    matrix: [
      0.8, 0  , 0,
      0  , 150, 0,
    ],
    matrix3d: [
      2  , 0.2, 0 , 0,
      0  , 0.5, 0 , 0,
      0  , 0  , 4 , 0,
      100, 50 , 25, 1,
    ],
  }), [
    'translate(40px, 50.2px)',
    'translate3d(18.2px, 100.05px, 5.2px)',
    'scale3d(1.8, 2.1, 6)',
    'rotate3d(49, 21.23, -92, 180deg)',
    'matrix(0.8, 0, 0, 0, 150, 0)',
    'matrix3d(2, 0.2, 0, 0, 0, 0.5, 0, 0, 0, 0, 4, 0, 100, 50, 25, 1)',
  ].join(' '));
});

test('raw value(string)', (t) => {
  const builder = factory();

  t.is(builder({
    translateX: '40.28px',
  }), 'translateX(40.28px)');

  t.is(builder({
    translateX: '350.25px',
    translateY: '-89.76px',
    translateZ: '75px',
    scale: '5',
    scaleX: '4.89',
    scaleY: '3.14',
    scaleZ: '65',
    rotate: '590deg',
    rotateX: '180.75deg',
    rotateY: '-54deg',
    rotateZ: '0deg',
    skewX: '28.91deg',
    skewY: '59.11deg',
    perspective: '500.25px',
    translate: '40px, 50.2px',
    translate3d: '18.2px, 100.05px, 5.2px',
    scale3d: '1.8, 2.1, 6',
    rotate3d: '49, 21.23, -92, 180deg',
    matrix: '0.8, 0, 0, 0, 150, 0',
    matrix3d: '2, 0.2, 0, 0, 0, 0.5, 0, 0, 0, 0, 4, 0, 100, 50, 25, 1',
  }), [
    'translateX(350.25px)',
    'translateY(-89.76px)',
    'translateZ(75px)',
    'translate(40px, 50.2px)',
    'translate3d(18.2px, 100.05px, 5.2px)',
    'scale(5)',
    'scale3d(1.8, 2.1, 6)',
    'scaleX(4.89)',
    'scaleY(3.14)',
    'scaleZ(65)',
    'rotate(590deg)',
    'rotate3d(49, 21.23, -92, 180deg)',
    'rotateX(180.75deg)',
    'rotateY(-54deg)',
    'rotateZ(0deg)',
    'skewX(28.91deg)',
    'skewY(59.11deg)',
    'perspective(500.25px)',
    'matrix(0.8, 0, 0, 0, 150, 0)',
    'matrix3d(2, 0.2, 0, 0, 0, 0.5, 0, 0, 0, 0, 4, 0, 100, 50, 25, 1)',
  ].join(' '));
});

test('non supported properties', (t) => {
  const builder = factory();

  t.is(builder({
    transition: 'all 200ms ease-out',
    opacity: 0,
  }), '');

  t.is(builder({
    translateZ: 300,
    textAlign: 'center',
    fontSize: 12,
  }), 'translateZ(300px)');
});

test('length = em, angle = rad', (t) => {
  const builder = factory({
    length: 'em',
    angle: 'rad',
  });

  t.is(builder({
    translateX: 350.25,
    translateY: -89.76,
    translateZ: 75,
    scale: 5,
    scaleX: 4.89,
    scaleY: 3.14,
    scaleZ: 65,
    rotate: 590,
    rotateX: 180.75,
    rotateY: -54,
    rotateZ: 0,
    skewX: 28.91,
    skewY: 59.110,
    perspective: 500.25,
  }), [
    'translateX(350.25em)',
    'translateY(-89.76em)',
    'translateZ(75em)',
    'scale(5)',
    'scaleX(4.89)',
    'scaleY(3.14)',
    'scaleZ(65)',
    'rotate(590rad)',
    'rotateX(180.75rad)',
    'rotateY(-54rad)',
    'rotateZ(0rad)',
    'skewX(28.91rad)',
    'skewY(59.11rad)',
    'perspective(500.25em)',
  ].join(' '));
});
