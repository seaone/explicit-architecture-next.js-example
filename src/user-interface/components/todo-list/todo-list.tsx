"use client";

import { TodoCreationForm } from "./todo-creation-form";
import { TodoListItem } from "./todo-list-item";
import { useTodoList } from "./use-todo-list";

export function TodoList() {
  const {
    error,
    isLoading,
    handleRemoveTodo,
    handleSubmit,
    handleUpdateTodo,
    todoList,
  } = useTodoList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <h1 className="text-2xl font-bold">To do list</h1>

      <TodoCreationForm onSubmit={handleSubmit} />

      <ul>
        {todoList?.map((t) => (
          <li className="mt-4 first:mt-0" key={t.id}>
            <TodoListItem
              todo={t}
              onRemove={handleRemoveTodo}
              onUpdate={handleUpdateTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
