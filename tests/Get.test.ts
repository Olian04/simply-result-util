import { describe } from 'vitest';
import { None } from "simply-result";

import { Get } from '../src/main';

const Fail = 'Fail';
const Expected = 'Expected';
const Key = 'Key';
const WeakKey = {};

describe('Get', () => {
  describe('Set', it => {
    it('should return Some if key is present', ({ expect }) => {
      const set = new Set<string>();
      set.add(Expected);
      const res = Get(set, Expected).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if key is missing', ({ expect }) => {
      const set = new Set<string>();
      const res = Get(set, Fail);
      expect(res).to.equal(None);
    });
  });

  describe('WeakSet', it => {
    it('should return Some if key is present', ({ expect }) => {
      const set = new WeakSet<object>();
      set.add(WeakKey);
      const res = Get(set, WeakKey).unwrapElse(() => expect.fail());
      expect(res).to.equal(WeakKey);
    });

    it('should return None if key is missing', ({ expect }) => {
      const set = new WeakSet<object>();
      const res = Get(set, WeakKey);
      expect(res).to.equal(None);
    });
  });

  describe('Map', it => {
    it('should return Some if key is present', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Expected);
      const res = Get(map, Key).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if key is missing', ({ expect }) => {
      const map = new Map<string, string>();
      const res = Get(map, Key);
      expect(res).to.equal(None);
    });
  });

  describe('WeakMap', it => {
    it('should return Some if key is present', ({ expect }) => {
      const map = new WeakMap<object, string>();
      map.set(WeakKey, Expected);
      const res = Get(map, WeakKey).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if key is missing', ({ expect }) => {
      const map = new WeakMap<object, string>();
      const res = Get(map, WeakKey);
      expect(res).to.equal(None);
    });
  })

  describe('Object', it => {
    it('should return Some if key is present', ({ expect }) => {
      const obj = { [Key]: Expected };
      const res = Get(obj, Key).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if key is missing', ({ expect }) => {
      const obj = {};
      const res = Get(obj, Key);
      expect(res).to.equal(None);
    });
  });

  describe('Array', it => {
    it('should return Some if index is within boundaries', ({ expect }) => {
      const array = [Expected];
      const res = Get(array, 0).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return Some if negative index is within boundaries', ({ expect }) => {
      const array = [Fail, Expected];
      const res = Get(array, -1).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if index is outside of boundaries', ({ expect }) => {
      const array = [Fail];
      const res = Get(array, 1);
      expect(res).to.equal(None);
    });

    it('should return None if empty', ({ expect }) => {
      const array = [];
      const res = Get(array, 0);
      expect(res).to.equal(None);
    });
  });
});
