import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";

export class DeleteTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw new UseCaseError("Failed to delete todo", { cause: error });
      }
      throw new UseCaseError("Unexpected error during deletion", {
        cause: error,
      });
    }
  }
}
