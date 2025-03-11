export interface PersistencePort<T> {
  save(key: string, data: T): Promise<void>;
  load(key: string): Promise<T | null>;
}
