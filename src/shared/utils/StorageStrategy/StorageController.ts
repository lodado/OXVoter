import { isServerSide } from '../isServerSide'
import { StorageStrategy } from './Strategy/type'

export default class StorageController<T extends Record<string, V>, V = any> {
  private strategy: StorageStrategy;

  constructor(strategy: StorageStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: StorageStrategy) {
    this.strategy = strategy;
  }

  create(value: T) {
    if (!isServerSide()) this.strategy.create(value);
  }

  read(): T | undefined {
    if (isServerSide()) return undefined;
    return this.strategy.read() as T;
  }

  readById(key: string): V | undefined {
    const object = this.read() as T;

    return object?.[key];
  }

  update(value: T) {
    if (!isServerSide()) this.strategy.update(value);
  }

  delete() {
    if (!isServerSide()) this.strategy.delete();
  }

  clear() {
    if (!isServerSide()) this.strategy.clear();
  }
}
