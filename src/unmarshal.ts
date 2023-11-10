import { Result, Option, Some, None, Ok, Err } from "simply-result";
import { Try } from "./Try";

export const unmarshalOption = <T>(str: string): Result<Option<T>> =>
  Try(() => JSON.parse(str))
    .mapErr(err => new Error(`Unable to unmarshal to Option: ${err.message}`))
    .andThen(it => {
      if (
        'isNone' in it &&
        'isSome' in it &&
        typeof it.isNone === 'boolean' &&
        typeof it.isSome === 'boolean'
      ) {
        if ('some' in it) {
          return Ok(Some(it.some as T));
        } else {
          return Ok(None);
        }
      }
      return Err(new Error(`Unable to unmarshal ${typeof it} to Option`));
    });

export const unmarshalResult = <T, E>(str: string): Result<Result<T, E>> =>
  Try(() => JSON.parse(str))
    .mapErr(err => new Error(`Unable to unmarshal to Result: ${err.message}`))
    .andThen(it => {
      if (
        'isErr' in it &&
        'isOk' in it &&
        typeof it.isErr === 'boolean' &&
        typeof it.isOk === 'boolean'
      ) {
        if ('ok' in it && !('err' in it)) {
          return Ok(Ok(it.ok as T));
        } else if ('err' in it && !('ok' in it)) {
          return Ok(Err(it.err as E));
        }
      }
      return Err(new Error(`Unable to unmarshal ${typeof it} to Result`));
    });
