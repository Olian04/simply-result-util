import { describe } from 'vitest';

import { marshal } from '../src/main';
import { Err, None, Ok, Some } from 'simply-result';

const Expected = 'Expected';

describe('marshal', it => {
  it('should return correct string for Ok', ({ expect }) => {
    const res = marshal(Ok(Expected)).unwrapElse(() => expect.fail());
    expect(res).to.equal(JSON.stringify({
      isErr: false,
      isOk: true,
      ok: Expected,
    }));
  });

  it('should return correct string for Err', ({ expect }) => {
    const res = marshal(Err(Expected)).unwrapElse(() => expect.fail());
    expect(res).to.equal(JSON.stringify({
      isErr: true,
      isOk: false,
      err: Expected,
    }));
  });

  it('should return correct string for Some', ({ expect }) => {
    const res = marshal(Some(Expected)).unwrapElse(() => expect.fail());
    expect(res).to.equal(JSON.stringify({
      isNone: false,
      isSome: true,
      some: Expected,
    }));
  });

  it('should return correct string for None', ({ expect }) => {
    const res = marshal(None).unwrapElse(() => expect.fail());
    expect(res).to.equal(JSON.stringify({
      isNone: true,
      isSome: false,
    }));
  });
});
