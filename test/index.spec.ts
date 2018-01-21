import test from 'ava';
import { createCSSTransformBuilder, properties } from '../src/';

test('export modules', (t) => {
  t.notThrows(() => {
    createCSSTransformBuilder();
  });

  t.true(Array.isArray(properties));
});
