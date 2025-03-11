import { Todo } from "@/core/domain/entities/todo";
import { PersistencePort } from "@/core/ports/persistence-port";
import {
  StorageLoadError,
  StorageWriteError,
} from "@/infrastructure/errors/infrastructure-errors";
import { LocalStorageTodoMapper } from "@/infrastructure/storage/local-storage/local-storage-todo-mapper";

export class LocalStorageTodoAdapter implements PersistencePort<Todo[]> {
  async save(key: string, data: Todo[]): Promise<void> {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(data.map(LocalStorageTodoMapper.toDto))
      );
    } catch (error) {
      throw new StorageWriteError("Storage write failed", { cause: error });
    }
  }

  async load(key: string): Promise<Todo[] | null> {
    try {
      const data = localStorage.getItem(key);
      return data
        ? JSON.parse(data).map(LocalStorageTodoMapper.toDomain)
        : null;
    } catch (error) {
      throw new StorageLoadError("Storage load failed", { cause: error });
    }
  }
}
