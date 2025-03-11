import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { UpdateTodoUseCase } from "@/core/application/use-cases/update-todo-use-case";
import { Todo } from "@/core/domain/entities/todo";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { StorageWriteError } from "@/infrastructure/errors/infrastructure-errors";

describe("UpdateTodoUseCase", () => {
  let repository: jest.Mocked<TodoRepository>;
  let useCase: UpdateTodoUseCase;

  beforeEach(() => {
    repository = {
      getAll: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;
    useCase = new UpdateTodoUseCase(repository);
  });

  it("should throw the DomainError if todo is undefined", async () => {
    repository.getAll.mockResolvedValue([]);

    await expect(
      useCase.execute("non-existent-id", { title: "title" })
    ).rejects.toThrow(new DomainError("Todo not found"));

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should validate title is not empty before saving", async () => {
    repository.getAll.mockResolvedValue([
      new Todo("1", "Test", false, new Date(), new Date()),
    ]);

    await expect(useCase.execute("1", { title: "" })).rejects.toThrow(
      new DomainError("Title is required")
    );

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should validate title is less than 100 symbols before saving", async () => {
    const longTitle = "a".repeat(101);

    repository.getAll.mockResolvedValue([
      new Todo("1", "Test", false, new Date(), new Date()),
    ]);

    await expect(useCase.execute("1", { title: longTitle })).rejects.toThrow(
      new DomainError("Title too long")
    );

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should return updated todo", async () => {
    const todo = new Todo("1", "Test", false, new Date(), new Date());
    repository.getAll.mockResolvedValue([todo]);

    const result = await useCase.execute("1", {
      title: "New title",
      isCompleted: true,
    });

    expect(result).toMatchObject({
      id: "1",
      title: "New title",
      isCompleted: true,
    });

    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw UseCaseError when InfrastructureError occurs", async () => {
    const error = new StorageWriteError("Storage failed");
    repository.save.mockRejectedValue(error);

    repository.getAll.mockResolvedValue([
      new Todo("1", "Test", false, new Date(), new Date()),
    ]);

    await expect(useCase.execute("1", { title: "New" })).rejects.toThrow(
      new UseCaseError("Failed to save todo", {
        cause: error,
      })
    );
  });
});
