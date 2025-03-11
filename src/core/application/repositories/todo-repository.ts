import { Todo } from "@/core/domain/entities/todo";
import { PersistencePort } from "@/core/ports/persistence-port";

export class TodoRepository {
  private readonly STORAGE_KEY = "todos";

  constructor(private readonly persistence: PersistencePort<Todo[]>) {}

  async getAll(): Promise<Todo[]> {
    return (await this.persistence.load(this.STORAGE_KEY)) || [];
  }

  async save(todo: Todo): Promise<void> {
    const todos = await this.getAll();

    if (todos.map((t) => t.id).indexOf(todo.id) !== -1) {
      const updated = todos.map((t) => (t.id === todo.id ? todo : t));
      await this.persistence.save(this.STORAGE_KEY, updated);
    } else {
      await this.persistence.save(this.STORAGE_KEY, [todo, ...todos]);
    }
  }

  async delete(id: string): Promise<void> {
    const todos = await this.getAll();
    const remainingTodos = todos.filter((t) => t.id !== id);
    await this.persistence.save(this.STORAGE_KEY, remainingTodos);
  }
}
