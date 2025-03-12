import { StorageStrategy } from './type'

export default class SessionStorageStrategy implements StorageStrategy {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  create(value: any) {
    sessionStorage.setItem(this.key, JSON.stringify(value))
  }

  read() {
    const item = sessionStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }

  update(value: any) {
    sessionStorage.setItem(this.key, JSON.stringify(value))
  }

  delete() {
    sessionStorage.removeItem(this.key)
  }

  clear() {
    sessionStorage.setItem(this.key, "");
  }
}
