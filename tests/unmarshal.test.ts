import { ExpectStatic, describe } from 'vitest';

import { unmarshalResult, unmarshalOption } from '../src/main';
import { Err, None, Ok, Some } from 'simply-result';

const Expected = 'Expected';

const expectLooseDeepEqual = <K extends number | string | symbol, V>(expect: ExpectStatic, source: Partial<Record<K, V>>, target: Partial<Record<K, V>>) => {
  const excludeFunctions = <T extends object>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([key, val]) => typeof val !== 'function'));
  expect(excludeFunctions(target)).to.deep.equal(excludeFunctions(source));
}

describe('unmarshalResult', it => {
  it('should return Ok for valid string', ({ expect }) => {
    const res = unmarshalResult(JSON.stringify({
      isErr: false,
      isOk: true,
      ok: Expected,
    })).unwrapElse(() => expect.fail());
    expectLooseDeepEqual(expect, Ok(Expected), res);
  });

  it('should return Err for valid string', ({ expect }) => {
    const res = unmarshalResult(JSON.stringify({
      isErr: true,
      isOk: false,
      err: Expected,
    })).unwrapElse(() => expect.fail());
    expectLooseDeepEqual(expect, Err(Expected), res);
  });

  it('should return fail for invalid string', ({ expect }) => {
    const res = unmarshalResult('{}').intoErrOption().unwrapElse(() => expect.fail());
    expect(res).to.be.instanceOf(Error);
  });
});

describe('unmarshalOption', it => {
  it('should return Some for valid string', ({ expect }) => {
    const res = unmarshalOption(JSON.stringify({
      isNone: false,
      isSome: true,
      some: Expected,
    })).unwrapElse(() => expect.fail());
    expectLooseDeepEqual(expect, Some(Expected), res);
  });

  it('should return None for valid string', ({ expect }) => {
    const res = unmarshalOption(JSON.stringify({
      isNone: true,
      isSome: false,
    })).unwrapElse(() => expect.fail());
    expectLooseDeepEqual(expect, None, res);
  });

  it('should return fail for invalid string', ({ expect }) => {
    const res = unmarshalOption('{}').intoErrOption().unwrapElse(() => expect.fail());
    expect(res).to.be.instanceOf(Error);
  });
});
