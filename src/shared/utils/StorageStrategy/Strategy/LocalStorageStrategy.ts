import { StorageStrategy } from './type'

export default class LocalStorageStrategy implements StorageStrategy {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  create(value: any) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  read() {
    const item = localStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }

  update(value: any) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  delete() {
    localStorage.removeItem(this.key)
  }

  clear() {
    localStorage.setItem(this.key, "");
  }
}
