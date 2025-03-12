export interface StorageStrategy {
  create(value: any): void
  read(): any
  update(value: any): void
  delete(): void
  clear(): void
}
