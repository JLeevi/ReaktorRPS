import cache from 'memory-cache';

const set = (key: string, value: any, timeout?: number | undefined) => {
  cache.put(key, value, timeout);
};

const get = (key: string) => cache.get(key);

const deleteKey = (key:string) => cache.del(key);

const STD_TIME = 1000 * 60 * 60;

export default {
  set,
  get,
  deleteKey,
  STD_TIME,
};
