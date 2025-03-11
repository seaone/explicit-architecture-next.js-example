import { todoUIAdapter } from "@/composition-root";
import { Todo } from "@/core/domain/entities/todo";
import { ErrorHandler } from "@/shared/errors/error-handler";
import { ChangeEvent, FormEvent, useState } from "react";

type UseTodoCreationFormInput = {
  onSubmit: (todo: Todo) => void;
};

type UseTodoCreationFormOutput = {
  error: string | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  title: string;
};

export function useTodoCreationForm({
  onSubmit,
}: UseTodoCreationFormInput): UseTodoCreationFormOutput {
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const todo = await todoUIAdapter.createTodo(title);

      onSubmit(todo);
      setTitle("");
      setError(null);
    } catch (error) {
      setError(ErrorHandler.handle(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    handleChange,
    handleSubmit,
    isLoading,
    title,
  };
}
