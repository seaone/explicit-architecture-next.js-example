import { todoUIAdapter } from "@/composition-root";
import { Todo } from "@/core/domain/entities/todo";
import { ErrorHandler } from "@/shared/errors/error-handler";
import { useEffect, useState } from "react";

type UseTodoListOutput = {
  error: string | null;
  isLoading: boolean;
  handleRemoveTodo: (todoId: Todo["id"]) => void;
  handleSubmit: (todo: Todo) => void;
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

  const handleRemoveTodo = (todoId: Todo["id"]) => {
    setTodoList((prevTodos) => {
      if (prevTodos !== null) {
        return prevTodos.filter((t) => t.id !== todoId);
      }

      return prevTodos;
    });
  };

  const handleSubmit = (todo: Todo) => {
    setTodoList((prevTodos) => {
      if (prevTodos !== null) {
        return [todo, ...prevTodos];
      }

      return prevTodos;
    });
  };

  return { error, isLoading, todoList, handleRemoveTodo, handleSubmit };
}
