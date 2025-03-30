import { Todo } from "@/core/domain/entities/todo";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { z } from "zod";

type UseTodoListInput = {
  onRemove: (id: Todo["id"]) => void;
  onUpdate: (todo: Todo) => void;
  todo: Todo;
};

type UseTodoListOutput = {
  errors?: z.ZodFormattedError<TodoFormData>;
  formData: TodoFormData;
  isCompleted: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTitleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const todoFormDataSchema = z.object({
  title: z.string().min(1),
});

type TodoFormData = z.infer<typeof todoFormDataSchema>;

const validateTodoFormData = (data: TodoFormData) => {
  const result = todoFormDataSchema.safeParse(data);
  return result.success ? undefined : result.error.format();
};

export const useTodoListItem = ({
  onRemove,
  onUpdate,
  todo,
}: UseTodoListInput): UseTodoListOutput => {
  const [userFormData, setUserFormData] = useState<Partial<TodoFormData>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);

  const formData: TodoFormData = {
    title: todo.title,
    ...userFormData,
  };

  const errors = validateTodoFormData(formData);

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setIsCompleted(value);

    const newTodo = new Todo(
      todo.id,
      todo.title,
      value,
      todo.createdAt,
      todo.updatedAt
    );

    onUpdate(newTodo);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUserFormData({
      title: value,
    });
  };

  const handleTitleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    if (formData.title === todo.title) {
      return;
    }

    if (errors) {
      setUserFormData({
        title: todo.title, // Revert to original title if invalid
      });

      return;
    }

    const newTodo = new Todo(
      todo.id,
      formData.title,
      todo.isCompleted,
      todo.createdAt,
      todo.updatedAt
    );

    onUpdate(newTodo);
  };

  const handleRemoveClick = async () => {
    onRemove(todo.id);
  };

  return {
    errors,
    formData,
    isCompleted,
    handleCheckboxChange,
    handleRemoveClick,
    handleTitleChange,
    handleTitleSubmit,
  };
};
