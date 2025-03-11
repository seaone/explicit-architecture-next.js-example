import { Todo } from "@/core/domain/entities/todo";
import {
  StorageLoadError,
  StorageWriteError,
} from "@/infrastructure/errors/infrastructure-errors";
import { LocalStorageTodoAdapter } from "./local-storage-todo-adapter";
import { LocalStorageTodoMapper } from "./local-storage-todo-mapper";

describe("LocalStorageTodoAdapter", () => {
  let adapter: LocalStorageTodoAdapter;
  const key = "test-key";
  const mockTodos: Todo[] = [
    new Todo("1", "Todo 1", false, new Date(), null),
    new Todo("2", "Todo 2", false, new Date(), null),
  ];

  beforeEach(() => {
    adapter = new LocalStorageTodoAdapter();
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("save", () => {
    it("should save todos to localStorage", async () => {
      await adapter.save(key, mockTodos);
      const storedData = localStorage.getItem(key);
      expect(storedData).toBe(
        JSON.stringify(mockTodos.map(LocalStorageTodoMapper.toDto))
      );
    });

    it("should throw StorageWriteError when localStorage.setItem fails", async () => {
      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      await expect(adapter.save(key, mockTodos)).rejects.toThrow(
        StorageWriteError
      );
    });
  });

  describe("load", () => {
    it("should load todos from localStorage", async () => {
      localStorage.setItem(
        key,
        JSON.stringify(mockTodos.map(LocalStorageTodoMapper.toDto))
      );
      const loadedTodos = await adapter.load(key);

      expect(loadedTodos).toEqual(mockTodos);
    });

    it("should return null if no data is found in localStorage", async () => {
      const loadedTodos = await adapter.load(key);
      expect(loadedTodos).toBeNull();
    });

    it("should throw StorageLoadError when localStorage.getItem fails", async () => {
      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("Mocked error");
      });

      await expect(adapter.load(key)).rejects.toThrow(StorageLoadError);
    });

    it("should throw StorageLoadError when JSON.parse fails", async () => {
      localStorage.setItem(key, "invalid-json");
      await expect(adapter.load(key)).rejects.toThrow(StorageLoadError);
    });
  });
});
