import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";
import { UseCaseError } from "../errors/use-case-errors";
import { TodoRepository } from "../repositories/todo-repository";
import { DeleteTodoUseCase } from "./delete-todo-use-case";

describe("DeleteTodoUseCase", () => {
  let repository: jest.Mocked<TodoRepository>;
  let useCase: DeleteTodoUseCase;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;

    useCase = new DeleteTodoUseCase(repository);
  });

  it("should delete a todo", async () => {
    repository.delete.mockResolvedValue(undefined);
    await useCase.execute("1");

    expect(repository.delete).toHaveBeenCalledWith("1");
  });

  it("should throw UseCaseError when InfrastructureError occurs", async () => {
    const error = new InfrastructureError("Storage error");
    repository.delete.mockRejectedValue(error);

    await expect(useCase.execute("1")).rejects.toThrow(
      new UseCaseError("Failed to delete todo", {
        cause: error,
      })
    );
  });

  it("should throw UseCaseError when unexpected error occurs", async () => {
    const error = new Error("Unexpected error");
    repository.delete.mockRejectedValue(error);

    await expect(useCase.execute("1")).rejects.toThrow(
      new UseCaseError("Unexpected error during deletion", {
        cause: error,
      })
    );
  });
});
