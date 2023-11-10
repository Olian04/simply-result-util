import { Result, Option } from "simply-result";
import { Try } from "./Try";

export const marshal = <T, E>(target: Result<T, E> | Option<T>): Result<string> => {
  if ('isOk' in target) {
    return Try(() => {
      const obj: {
        isErr: boolean;
        isOk: boolean;
        ok?: T;
        err?: E;
      } = {
        isErr: target.isErr,
        isOk: target.isOk,
      }
      if (target.isOk) {
        obj.ok = target.ok;
      }
      if (target.isErr) {
        obj.err = target.err;
      }
      return JSON.stringify(obj);
    }).mapErr(err => new Error(`Unable to marshal Result to string: ${err.message}`));
  }
  return Try(() => {
    const obj: {
      isNone: boolean;
      isSome: boolean;
      some?: T;
    } = {
      isNone: target.isNone,
      isSome: target.isSome,
    }
    if (target.isSome) {
      obj.some = target.some;
    }
    return JSON.stringify(obj);
  }).mapErr(err => new Error(`Unable to marshal Option to string: ${err.message}`));
}

