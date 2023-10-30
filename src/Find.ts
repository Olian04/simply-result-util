import { Option, Some, None } from "simply-result";
import { IterableMapLike } from "./types/MapLike";

export function Find<V, K>(mapLike: IterableMapLike<K, V>, predicate: (item: V, key: K) => boolean): Option<V>;
export function Find<V, K extends number | string | symbol>(object: Partial<Record<K, V>>, predicate: (item: V, key: K) => boolean): Option<V>;
export function Find<V>(arrayLike: ArrayLike<V>, predicate: (item: V, index: number) => boolean): Option<V>;
export function Find<V, K extends number | string | symbol>(target: IterableMapLike<K, V> | Partial<Record<K, V>> | ArrayLike<V>, predicate: (item: V, key: number | K) => boolean): Option<V> {
  if (Array.isArray(target)) {
    if (target.length === 0) {
      return None;
    }
    for (let index = 0; index < target.length; index++) {
      const item = target[index];
      if (predicate(item, index)) {
        return Some(item);
      }
    }
    return None;
  }

  if ('keys' in target) {
    for (let key of target.keys()) {
      const item = target.get(key);
      if (predicate(item, key)) {
        return Some(item);
      }
    }
    return None;
  }

  for (let key in target) {
    const item = target[key];
    if (predicate(target[key], key as K)) {
      return Some(item);
    }
  }
  return None;
}
