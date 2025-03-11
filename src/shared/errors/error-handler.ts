import { UseCaseError } from "@/core/application/errors/use-case-errors";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { InfrastructureError } from "@/infrastructure/errors/infrastructure-errors";

export class ErrorHandler {
  static handle(error: Error | unknown): string {
    console.error(error);

    if (error instanceof DomainError) {
      return error.message;
    } else if (error instanceof UseCaseError) {
      return `Application error: ${error.message}`;
    } else if (error instanceof InfrastructureError) {
      return `Infrastructure error: ${error.message}`;
    }
    return `Unexpected error: ${error}`;
  }
}
