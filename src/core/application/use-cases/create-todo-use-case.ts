import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { Todo } from "@/core/domain/entities/todo";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";
import { v4 as uuidv4 } from "uuid";

export class CreateTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(title: Todo["title"]): Promise<Todo> {
    const todo = new Todo(uuidv4(), title, false, new Date(), null);

    todo.validate();

    try {
      await this.repository.save(todo);
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw new UseCaseError("Failed to save todo", { cause: error });
      }
      throw new UseCaseError("Unexpected error during creation", {
        cause: error,
      });
    }

    return todo;
  }
}
