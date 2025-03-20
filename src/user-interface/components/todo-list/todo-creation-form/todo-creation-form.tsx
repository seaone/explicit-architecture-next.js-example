import { Todo } from "@/core/domain/entities/todo";
import { useTodoCreationForm } from "./use-todo-creation-form";

type TodoCreationFormProps = {
  onSubmit: (todo: Todo) => void;
};

export function TodoCreationForm({ onSubmit }: TodoCreationFormProps) {
  const { error, handleChange, handleSubmit, isLoading, title } =
    useTodoCreationForm({ onSubmit });

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-4 w-full">
        <input
          className="border-b grow-1 h-6"
          type="text"
          value={title}
          placeholder="Add task"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          title="Add task"
          className="border-1 w-6 h-6 p-0 leading-1 shrink-0 border-black rounded hover:bg-black hover:text-white focus:bg-black focus:text-white"
        >
          +
        </button>
      </div>

      {error !== null && (
        <div className="text-red-400 mt-4 text-sm">{error}</div>
      )}
    </form>
  );
}
