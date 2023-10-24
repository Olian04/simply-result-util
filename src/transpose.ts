import { Option, Some, None, Result, Err, Ok } from "simply-result";

export const transpose = <V, E>(result: Result<Option<V>, E>): Option<Result<V, E>> => result.match({
  Ok: option => option.match<Option<Result<V, E>>>({
    Some: value => Some(Ok(value)),
    None: () => None,
  }),
  Err: err => Some(Err(err)),
});
