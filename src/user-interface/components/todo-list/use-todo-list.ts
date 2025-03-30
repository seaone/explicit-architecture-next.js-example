import { todoUIAdapter } from "@/composition-root";
import { Todo } from "@/core/domain/entities/todo";
import { ErrorHandler } from "@/shared/errors/error-handler";
import { useCallback, useEffect, useState } from "react";

type UseTodoListOutput = {
  error: string | null;
  isLoading: boolean;
  handleRemoveTodo: (todoId: Todo["id"]) => void;
  handleSubmit: (title: Todo["title"]) => void;
  handleUpdateTodo: (todo: Todo) => void;
  todoList: Todo[] | null;
};

export function useTodoList(): UseTodoListOutput {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadTodoList = async () => {
      setIsLoading(true);

      try {
        const todos = await todoUIAdapter.getAllTodos();
        setTodoList(todos);
        setError(null);
      } catch (error) {
        setError(ErrorHandler.handle(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadTodoList();
  }, []);

  const handleRemoveTodo = useCallback(async (todoId: Todo["id"]) => {
    try {
      await todoUIAdapter.deleteTodo(todoId);

      setTodoList((prevTodos) => {
        if (prevTodos !== null) {
          return prevTodos.filter((t) => t.id !== todoId);
        }

        return prevTodos;
      });
    } catch (error) {
      setError(ErrorHandler.handle(error));
    }
  }, []);

  const handleUpdateTodo = useCallback(async (todo: Todo) => {
    try {
      const updatedTodo = await todoUIAdapter.updateTodo(todo.id, todo);

      setTodoList((prevTodos) => {
        if (prevTodos !== null) {
          return prevTodos.map((t) =>
            updatedTodo.id === t.id ? updatedTodo : t
          );
        }

        return prevTodos;
      });
    } catch (error) {
      setError(ErrorHandler.handle(error));
    }
  }, []);

  const handleSubmit = useCallback(async (title: string) => {
    try {
      const todo = await todoUIAdapter.createTodo(title);

      setTodoList((prevTodos) => {
        if (prevTodos !== null) {
          return [todo, ...prevTodos];
        }

        return prevTodos;
      });
    } catch (error) {
      setError(ErrorHandler.handle(error));
    }
  }, []);

  return {
    error,
    isLoading,
    handleRemoveTodo,
    handleSubmit,
    handleUpdateTodo,
    todoList,
  };
}
