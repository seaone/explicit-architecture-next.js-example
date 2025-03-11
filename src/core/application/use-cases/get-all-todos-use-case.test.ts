import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { GetAllTodosUseCase } from "@/core/application/use-cases/get-all-todos-use-case";
import { Todo } from "@/core/domain/entities/todo";
import { StorageLoadError } from "@/infrastructure/errors/infrastructure-errors";
import { UseCaseError } from "../errors/use-case-errors";

describe("GetAllTodosUseCase", () => {
  let repository: jest.Mocked<TodoRepository>;
  let useCase: GetAllTodosUseCase;

  beforeEach(() => {
    repository = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;
    useCase = new GetAllTodosUseCase(repository);
  });

  it("should return todos", async () => {
    const mockTodos = [
      new Todo("1", "Test title", false, new Date(), null),
      new Todo("2", "Test title", false, new Date(), null),
    ];
    repository.getAll.mockResolvedValue(mockTodos);

    const result = await useCase.execute();

    expect(result.length).toBe(2);
    expect(result).toEqual(mockTodos);
  });

  it("should trhow UseCaseError when InfrastructureError occurs", async () => {
    const error = new StorageLoadError("Storage load failed");
    repository.getAll.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow(
      new UseCaseError("Failed to load todos", {
        cause: error,
      })
    );
  });

  it("should throw UseCaseError when unexpected error occurs", async () => {
    const error = new Error("Unexpected error");
    repository.getAll.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow(
      new UseCaseError("Unexpected error during loading", {
        cause: error,
      })
    );
  });
});
