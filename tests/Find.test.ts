import { describe } from 'vitest';
import { None } from "simply-result";

import { Find } from '../src/main';

const Fail = 'Fail';
const Expected = 'Expected';
const Key = 'Key';

describe('Find', () => {
  describe('Set', it => {
    it('should return Some if Item is present', ({ expect }) => {
      const set = new Set<string>();
      set.add(Expected);
      const res = Find(set, el => el === Expected).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if Item is missing', ({ expect }) => {
      const set = new Set<string>();
      set.add(Fail);
      const res = Find(set, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if empty', ({ expect }) => {
      const set = new Set<string>();
      const res = Find(set, el => el === Expected);
      expect(res).to.equal(None);
    });
  });

  describe('Map', it => {
    it('should return Some if Item is present', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Expected);
      const res = Find(map, el => el === Expected).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if Item is missing', ({ expect }) => {
      const map = new Map<string, string>();
      map.set(Key, Fail);
      const res = Find(map, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if empty', ({ expect }) => {
      const map = new Map<string, string>();
      const res = Find(map, el => el === Expected);
      expect(res).to.equal(None);
    });
  });

  describe('Object', it => {
    it('should return Some if Property is present', ({ expect }) => {
      const obj = { [Key]: Expected };
      const res = Find(obj, el => el === Expected).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if Property is missing', ({ expect }) => {
      const obj = { [Key]: Fail };
      const res = Find(obj, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if empty', ({ expect }) => {
      const obj = {};
      const res = Find(obj, el => el === Expected);
      expect(res).to.equal(None);
    });
  });

  describe('Array', it => {
    it('should return Some if Element is present', ({ expect }) => {
      const array = [Expected];
      const res = Find(array, el => el === Expected).unwrapElse(() => expect.fail());
      expect(res).to.equal(Expected);
    });

    it('should return None if Element is missing', ({ expect }) => {
      const array = [Fail];
      const res = Find(array, el => el === Expected);
      expect(res).to.equal(None);
    });

    it('should return None if empty', ({ expect }) => {
      const array = [];
      const res = Find(array, () => true);
      expect(res).to.equal(None);
    });
  });
});
