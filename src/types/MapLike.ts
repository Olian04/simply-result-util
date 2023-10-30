export type MapLike<K, V> = {
  get(key: K): V | undefined;
  has(key: K): boolean;
};

export type IterableMapLike<K, V> = {
  get(key: K): V | undefined;
  keys(): IterableIterator<K>;
};
