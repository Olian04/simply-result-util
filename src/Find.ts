import { Option, Some, None } from "simply-result";

export const Find = <V>(arraylike: ArrayLike<V>, predicate: (item: V, index: number) => boolean): Option<V> => {
  if (arraylike.length === 0) {
    return None;
  }
  for (let index = 0; index < arraylike.length; index++) {
    const item = arraylike[index];
    if (predicate(item, index)) {
      return Some(item);
    }
  }
  return None;
};
