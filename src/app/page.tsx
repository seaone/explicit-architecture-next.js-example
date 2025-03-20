"use client";

import { TodoList } from "@/user-interface/components/todo-list";

export default function Home() {
  return (
    <main className="flex flex-col p-12">
      <TodoList />
    </main>
  );
}
