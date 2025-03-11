import { Todo } from "@/core/domain/entities/todo";
import { LocalStorageTodoDTO } from "@/infrastructure/storage/local-storage/local-storage-todo-dto";

export class LocalStorageTodoMapper {
  static toDomain(dto: LocalStorageTodoDTO): Todo {
    return new Todo(
      dto.id,
      dto.title,
      dto.isCompleted,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }

  static toDto(dto: Todo): LocalStorageTodoDTO {
    return {
      id: dto.id,
      title: dto.title,
      isCompleted: dto.isCompleted,
      createdAt: dto.createdAt.toISOString(),
      updatedAt: dto.createdAt.toISOString(),
    };
  }
}
