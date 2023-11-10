export type SetLike<K> = {
  has(key: K): boolean;
};

export type IterableSetLike<K> = {
  values(): IterableIterator<K>;
};
