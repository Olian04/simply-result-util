import { describe } from 'vitest';
import { None } from "simply-result";

import { Get } from '../src/main';

const Fail = 'Fail';
const Expected = 'Expected';
const Key = 'Key';
const WeakKey = {};

describe('Get', () => {
  describe('Map', it => {
    it('should return Some if key is in Map', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Expected);
      const res = Get(map, Key);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if key is missing in Map', ({ expect }) => {
      const map = new Map<string, string>();
      const res = Get(map, Key);
      expect(res).to.equal(None);
    });

    it('should return Some if key is in WeakMap', ({ expect }) => {
      const map = new WeakMap<object, string>();
      map.set(WeakKey, Expected);
      const res = Get(map, WeakKey);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if key is missing in WeakMap', ({ expect }) => {
      const map = new WeakMap<object, string>();
      const res = Get(map, WeakKey);
      expect(res).to.equal(None);
    });
  })

  describe('Object', it => {
    it('should return Some if key is in object', ({ expect }) => {
      const obj = { [Key]: Expected };
      const res = Get(obj, Key);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if key is missing in object', ({ expect }) => {
      const obj = {};
      const res = Get(obj, Key);
      expect(res).to.equal(None);
    });
  });

  describe('Array', it => {
    it('should return Some if index is in array boundaries', ({ expect }) => {
      const array = [Expected];
      const res = Get(array, 0);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return Some if negative index is in array boundaries', ({ expect }) => {
      const array = [Fail, Expected];
      const res = Get(array, -1);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if index is outside of array boundaries', ({ expect }) => {
      const array = [Fail];
      const res = Get(array, 1);
      expect(res).to.equal(None);
    });

    it('should return None if Array is empty', ({ expect }) => {
      const array = [];
      const res = Get(array, 0);
      expect(res).to.equal(None);
    });
  });
});
