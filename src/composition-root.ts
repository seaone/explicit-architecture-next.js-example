import { TodoRepository } from "@/core/application/repositories/todo-repository";
import { CreateTodoUseCase } from "@/core/application/use-cases/create-todo-use-case";
import { DeleteTodoUseCase } from "@/core/application/use-cases/delete-todo-use-case";
import { GetAllTodosUseCase } from "@/core/application/use-cases/get-all-todos-use-case";
import { UpdateTodoUseCase } from "@/core/application/use-cases/update-todo-use-case";
import { LocalStorageTodoAdapter } from "@/infrastructure/storage/local-storage/local-storage-todo-adapter";
import { TodoUIAdapter } from "@/user-interface/adapters/todo-ui-adapter";

const persistenceAdapter = new LocalStorageTodoAdapter();
const todoRepository = new TodoRepository(persistenceAdapter);

const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
const getAllTodosUseCase = new GetAllTodosUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

export const todoUIAdapter = new TodoUIAdapter(
  getAllTodosUseCase,
  createTodoUseCase,
  updateTodoUseCase,
  deleteTodoUseCase
);
