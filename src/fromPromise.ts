import { Result } from "simply-result";

import { TryAsync } from "./Try";

export const fromPromise = <T, E = Error>(promiselike: PromiseLike<T>): Promise<Result<T, E>> => TryAsync(async () => promiselike);
