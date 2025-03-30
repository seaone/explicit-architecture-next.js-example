import { Todo } from "@/core/domain/entities/todo";
import { memo } from "react";
import { useTodoListItem } from "./use-todo-list-item";

type TodoListItemProps = {
  onRemove: (id: Todo["id"]) => void;
  onUpdate: (todo: Todo) => void;
  todo: Todo;
};

export const TodoListItem = memo(function TodoListItem({
  todo,
  onRemove,
  onUpdate,
}: TodoListItemProps) {
  const {
    errors,
    formData,
    isCompleted,
    handleCheckboxChange,
    handleTitleChange,
    handleTitleSubmit,
    handleRemoveClick,
  } = useTodoListItem({
    onRemove,
    onUpdate,
    todo,
  });

  console.log("rerender", todo.title);

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          className="shrink-0"
        />
        <form
          onBlur={handleTitleSubmit}
          onSubmit={handleTitleSubmit}
          className="flex grow-1"
        >
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="grow-1 h-6"
          />
        </form>

        <button
          type="button"
          title="Remove todo"
          onClick={handleRemoveClick}
          className="shrink-0 w-6 h-6 hover:text-red-400 focus:text-red-400"
        >
          ×
        </button>
      </div>

      {errors && (
        <div className="text-red-400 mt-4 text-sm">
          {errors?.title?._errors.join(", ")}
        </div>
      )}
    </div>
  );
});
