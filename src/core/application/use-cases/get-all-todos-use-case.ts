import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { Todo } from "@/core/domain/entities/todo";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";

export class GetAllTodosUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw new UseCaseError("Failed to load todos", { cause: error });
      }
      throw new UseCaseError("Unexpected error during loading", {
        cause: error,
      });
    }
  }
}
