import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { Todo } from "@/core/domain/entities/todo";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";

export class UpdateTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(id: string, updateData: Partial<Todo>): Promise<Todo> {
    const todos = await this.repository.getAll();
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      throw new DomainError("Todo not found");
    }

    const updatedTodo = new Todo(
      id,
      updateData.title ?? todo.title,
      updateData.isCompleted ?? todo.isCompleted,
      todo.createdAt,
      new Date()
    );

    updatedTodo.validate();

    try {
      await this.repository.save(updatedTodo);
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw new UseCaseError("Failed to save todo", { cause: error });
      }
      throw new UseCaseError("Unexpected error during update", {
        cause: error,
      });
    }

    return updatedTodo;
  }
}
