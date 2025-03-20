import { Todo } from "@/core/domain/entities/todo";
import { useTodoListItem } from "./use-todo-list-item";

type TodoListItemProps = {
  onRemove: (id: Todo["id"]) => void;
  todo: Todo;
};

export function TodoListItem({ todo, onRemove }: TodoListItemProps) {
  const {
    title,
    isCompleted,
    handleCheckboxChange,
    handleTitleChange,
    handleTitleSubmit,
    handleRemoveClick,
  } = useTodoListItem({
    initialIsCompleted: todo.isCompleted,
    initialTitle: todo.title,
    onRemove: onRemove,
    todoId: todo.id,
  });

  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className="shrink-0"
      />
      <form onSubmit={handleTitleSubmit} className="flex grow-1">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
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
  );
}
