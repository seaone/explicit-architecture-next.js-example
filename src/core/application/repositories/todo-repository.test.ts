import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { Todo } from "@/core/domain/entities/todo";
import { PersistencePort } from "@/core/ports/persistence-port";

class MockPersistence implements PersistencePort<Todo[]> {
  save = jest.fn();
  load = jest.fn();
}

describe("TodoRepository", () => {
  let repository: TodoRepository;
  let mockPersistence: MockPersistence;

  beforeEach(() => {
    mockPersistence = new MockPersistence();
    repository = new TodoRepository(mockPersistence);
  });

  it("should retrun all todos", async () => {
    const todos = [
      new Todo("1", "Todo 1", false, new Date(), null),
      new Todo("2", "Todo 2", false, new Date(), null),
    ];

    mockPersistence.load.mockResolvedValue(todos);

    const result = await repository.getAll();

    expect(mockPersistence.load).toHaveBeenCalledWith("todos");
    expect(result).toEqual(todos);
  });

  it("should save a todo", async () => {
    const todos = [
      new Todo("1", "Todo 1", false, new Date(), null),
      new Todo("2", "Todo 2", false, new Date(), null),
    ];
    const newTodo = new Todo("3", "Todo 3", false, new Date(), null);

    mockPersistence.load.mockResolvedValue(todos);

    await repository.save(newTodo);

    expect(mockPersistence.save).toHaveBeenCalledWith("todos", [
      newTodo,
      ...todos,
    ]);
  });

  it("should delete a todo", async () => {
    const todos = [
      new Todo("1", "Todo 1", false, new Date(), null),
      new Todo("2", "Todo 2", false, new Date(), null),
    ];

    mockPersistence.load.mockResolvedValue(todos);

    await repository.delete("1");

    expect(mockPersistence.save).toHaveBeenCalledWith("todos", [todos[1]]);
  });
});
