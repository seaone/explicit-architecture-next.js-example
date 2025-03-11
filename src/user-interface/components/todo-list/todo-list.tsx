"use client";

import { TodoCreationForm } from "./todo-creation-form";
import { TodoListItem } from "./todo-list-item";
import { useTodoList } from "./use-todo-list";

export function TodoList() {
  const { error, isLoading, todoList, handleRemoveTodo, handleSubmit } =
    useTodoList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TodoCreationForm onSubmit={handleSubmit} />

      <ul>
        {todoList?.map((t) => (
          <li className="mt-4 first:mt-0" key={t.id}>
            <TodoListItem todo={t} onRemove={handleRemoveTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
