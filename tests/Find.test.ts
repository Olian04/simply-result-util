import { describe } from 'vitest';
import { None } from "simply-result";

import { Find } from '../src/main';

const Fail = 'Fail';
const Expected = 'Expected';
const Key = 'Key';

describe('Find', () => {
  describe('Map', it => {
    it('should return Some if Item is in Map', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Expected);
      const res = Find(map, el => el === Expected);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if Item is missing in Map', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Fail);
      const res = Find(map, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if Object has no keys', ({ expect }) => {
      const map = new Map<string, string>();
      const res = Find(map, el => el === Expected);
      expect(res).to.equal(None);
    });
  });

  describe('Object', it => {
    it('should return Some if Property is in Object', ({ expect }) => {
      const obj = { [Key]: Expected };
      const res = Find(obj, el => el === Expected);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if Property is missing in Object', ({ expect }) => {
      const obj = { [Key]: Fail };
      const res = Find(obj, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if Object has no keys', ({ expect }) => {
      const obj = {};
      const res = Find(obj, el => el === Expected);
      expect(res).to.equal(None);
    });
  });

  describe('Array', it => {
    it('should return Some if Element is in Array', ({ expect }) => {
      const array = [Expected];
      const res = Find(array, el => el === Expected);
      expect(
        res.isSome
         ? res.some
         : expect.fail()
      ).to.equal(Expected);
    });

    it('should return None if Element is missing in Array', ({ expect }) => {
      const array = [Fail];
      const res = Find(array, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if Array is empty', ({ expect }) => {
      const array = [];
      const res = Find(array, () => true);
      expect(res).to.equal(None);
    });
  });
});
