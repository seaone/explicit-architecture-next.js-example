import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { CreateTodoUseCase } from "@/core/application/use-cases/create-todo-use-case";
import { Todo } from "@/core/domain/entities/todo";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";

describe("CreateTodoUseCase", () => {
  let repository: jest.Mocked<TodoRepository>;
  let useCase: CreateTodoUseCase;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;
    useCase = new CreateTodoUseCase(repository);
  });

  it("should create a valid todo", async () => {
    const todo = await useCase.execute("Test title");
    expect(todo).toBeInstanceOf(Todo);
    expect(todo.title).toBe("Test title");
    expect(todo.isCompleted).toBe(false);
    expect(repository.save).toHaveBeenCalledWith(todo);
  });

  it("should validate title is not empty before saving", async () => {
    await expect(useCase.execute("")).rejects.toThrow(
      new DomainError("Title is required")
    );

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should validate title is less than 100 symbols before saving", async () => {
    const longTitle = "a".repeat(101);

    await expect(useCase.execute(longTitle)).rejects.toThrow(
      new DomainError("Title too long")
    );

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should throw UseCaseError when InfrastructureError occurs", async () => {
    const error = new InfrastructureError("Storage error");
    repository.save.mockRejectedValue(error);

    await expect(useCase.execute("Test title")).rejects.toThrow(
      new UseCaseError("Failed to save todo", {
        cause: error,
      })
    );
  });
});
