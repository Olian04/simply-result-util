import { describe } from 'vitest';
import { None } from "simply-result";

import { Find } from '../src/main';

const Expected = 'Expected';
const Fail = 'Fail';


describe('Find', it => {
  it('should return Some if Element is in Array', ({ expect }) => {
    const map = [Expected];
    const res = Find(map, el => el === Expected);
    expect(
      res.isSome
       ? res.some
       : expect.fail()
    ).to.equal(Expected);
  });

  it('should return None if Element is missing in Array', ({ expect }) => {
    const map = [Fail];
    const res = Find(map, el => el === Expected);
    expect(res).to.equal(None);
  });

  it('should return None if Array is empty', ({ expect }) => {
    const map = [];
    const res = Find(map, () => true);
    expect(res).to.equal(None);
  });
});
