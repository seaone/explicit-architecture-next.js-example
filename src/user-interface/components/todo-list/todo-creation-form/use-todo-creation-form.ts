import { Todo } from "@/core/domain/entities/todo";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

type UseTodoCreationFormInput = {
  onSubmit: (title: Todo["title"]) => void;
};

type UseTodoCreationFormOutput = {
  errors?: z.ZodFormattedError<TodoFormData>;
  formData: { title: string };
  handleBlur: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleReset: () => void;
};

const todoFormDataSchema = z.object({
  title: z.string().min(1),
});

type TodoFormData = z.infer<typeof todoFormDataSchema>;

const initialFormData: TodoFormData = {
  title: "",
};

const validateTodoFormData = (data: TodoFormData) => {
  const result = todoFormDataSchema.safeParse(data);
  return result.success ? undefined : result.error.format();
};

export function useTodoCreationForm({
  onSubmit,
}: UseTodoCreationFormInput): UseTodoCreationFormOutput {
  const [hasErrors, setHasError] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<Partial<TodoFormData>>({});

  const formData = {
    ...initialFormData,
    ...userFormData,
  };

  const errors = validateTodoFormData(formData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasError(false);

    setUserFormData((data) => ({
      ...data,
      title: event.target.value,
    }));
  };

  const handleReset = () => {
    setHasError(false);
    setUserFormData({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errors) {
      setHasError(true);
      return;
    }

    setUserFormData({});
    onSubmit(formData.title);
  };

  const handleBlur = async () => {
    setHasError(false);
  };

  return {
    errors: hasErrors ? errors : undefined,
    formData,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
