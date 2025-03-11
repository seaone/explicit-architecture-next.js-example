import { todoUIAdapter } from "@/composition-root";
import { Todo } from "@/core/domain/entities/todo";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  useState,
} from "react";

type UseTodoListInput = {
  initialTitle: string;
  initialIsCompleted: boolean;
  onRemove: (id: Todo["id"]) => void;
  todoId: Todo["id"];
};

type UseTodoListOutput = {
  title: string;
  isCompleted: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTitleSubmit: (
    event: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>
  ) => void;
};

export const useTodoListItem = ({
  initialTitle,
  initialIsCompleted,
  onRemove,
  todoId,
}: UseTodoListInput): UseTodoListOutput => {
  const [title, setTitle] = useState(initialTitle);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setIsCompleted(value);

    try {
      await todoUIAdapter.updateTodo(todoId, { isCompleted: value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleTitleSubmit = async (
    event: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      await todoUIAdapter.updateTodo(todoId, { title: title });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveClick = async () => {
    try {
      await todoUIAdapter.deleteTodo(todoId);

      onRemove(todoId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    title,
    isCompleted,
    handleCheckboxChange,
    handleRemoveClick,
    handleTitleChange,
    handleTitleSubmit,
  };
};
