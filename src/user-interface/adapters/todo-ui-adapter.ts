import { CreateTodoUseCase } from "@/core/application/use-cases/create-todo-use-case";
import { DeleteTodoUseCase } from "@/core/application/use-cases/delete-todo-use-case";
import { GetAllTodosUseCase } from "@/core/application/use-cases/get-all-todos-use-case";
import { UpdateTodoUseCase } from "@/core/application/use-cases/update-todo-use-case";
import { Todo } from "@/core/domain/entities/todo";

export class TodoUIAdapter {
  constructor(
    private getAllTodosUseCase: GetAllTodosUseCase,
    private createTodoUseCase: CreateTodoUseCase,
    private updateTodoUseCase: UpdateTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    try {
      return await this.getAllTodosUseCase.execute();
    } catch (error) {
      throw error;
    }
  }

  async createTodo(title: Todo["title"]): Promise<Todo> {
    try {
      return await this.createTodoUseCase.execute(title);
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(id: Todo["id"], data: Partial<Todo>): Promise<Todo> {
    try {
      return await this.updateTodoUseCase.execute(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: Todo["id"]): Promise<void> {
    try {
      await this.deleteTodoUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  }
}
