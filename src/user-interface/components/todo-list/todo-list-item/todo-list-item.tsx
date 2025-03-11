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
      />
      <form onSubmit={handleTitleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
        />
      </form>

      <button type="button" title="Remove todo" onClick={handleRemoveClick}>
        X
      </button>
    </div>
  );
}
