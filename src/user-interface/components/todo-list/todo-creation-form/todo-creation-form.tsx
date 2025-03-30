import { Todo } from "@/core/domain/entities/todo";
import { useTodoCreationForm } from "./use-todo-creation-form";

type TodoCreationFormProps = {
  onSubmit: (title: Todo["title"]) => void;
};

export function TodoCreationForm({ onSubmit }: TodoCreationFormProps) {
  const {
    errors,
    formData,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  } = useTodoCreationForm({
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} onBlur={handleBlur} className="w-full">
      <div className="flex gap-4 w-full">
        <div className="relative grow-1 flex">
          <input
            className="border-b h-6 grow-1 pr-6"
            type="text"
            value={formData.title}
            placeholder="Add task"
            onChange={handleChange}
          />

          {formData.title.length > 0 && (
            <button
              type="button"
              title="Reset"
              onClick={handleReset}
              className="absolute right-0 border-0 w-6 h-6 p-0 leading-1 shrink-0 rounded hover:text-red-400 focus:text-red-400"
            >
              ×
            </button>
          )}
        </div>

        <button
          title="Add task"
          className="border-1 w-6 h-6 p-0 leading-1 shrink-0 border-black rounded hover:bg-black hover:text-white focus:bg-black focus:text-white"
        >
          +
        </button>
      </div>

      {errors && (
        <div className="text-red-400 mt-4 text-sm">
          {errors?.title?._errors.join(", ")}
        </div>
      )}
    </form>
  );
}
