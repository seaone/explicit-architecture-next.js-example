import { Todo } from "@/core/domain/entities/todo";
import { useTodoCreationForm } from "./use-todo-creation-form";

type TodoCreationFormProps = {
  onSubmit: (todo: Todo) => void;
};

export function TodoCreationForm({ onSubmit }: TodoCreationFormProps) {
  const { error, handleChange, handleSubmit, isLoading, title } =
    useTodoCreationForm({ onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <input
          className="border-b"
          type="text"
          value={title}
          onChange={handleChange}
        />
        <button disabled={isLoading}>Ok</button>
      </div>

      {error !== null && (
        <div className="text-red-400 mt-4 text-sm">{error}</div>
      )}
    </form>
  );
}
