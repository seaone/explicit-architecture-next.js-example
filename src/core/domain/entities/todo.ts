import { DomainError } from "@/core/domain/errors/domain-errors";

export class Todo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly isCompleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null
  ) {}

  validate() {
    if (!this.title.trim()) {
      throw new DomainError("Title is required");
    }

    if (this.title.length > 100) {
      throw new DomainError("Title too long");
    }
  }
}
