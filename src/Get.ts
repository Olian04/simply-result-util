import { Option, Some, None } from "simply-result";
import { MapLike } from "./types/MapLike";
import { SetLike } from "./types/SetLike";

export function Get<V, K>(mapLike: MapLike<K, V>, key: K): Option<V>;
export function Get<V>(setLike: SetLike<V>, item: V): Option<V>;
export function Get<V, K extends number | string | symbol>(object: Partial<Record<K, V>>, key: K): Option<V>;
export function Get<V>(arrayLike: ArrayLike<V>, index: number): Option<V>;
export function Get<V, K extends number | string | symbol>(target: MapLike<K, V> | SetLike<V> | Partial<Record<K, V>> | ArrayLike<V>, key: any): Option<V> {
  if (Array.isArray(target)) {
    if (target.length === 0) {
      return None;
    }
    if (key < 0) {
      // Loop around from the end of the array if the index is negative
      key = target.length + key;
    }
    if (key >= 0 && key < target.length) {
      return Some(target[key]);
    }
    return None;
  }

  if ('get' in target) {
    if (target.has(key as K)) {
      return Some(target.get(key as K));
    }
    return None;
  }

  if ('has' in target) {
    if (target.has(key as V)) {
      return Some(key as V);
    }
  }

  if (key in target) {
    return Some((target as Partial<Record<K, V>>)[key as K]);
  }
  return None;
}
