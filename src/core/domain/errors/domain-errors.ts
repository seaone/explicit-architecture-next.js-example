import { BaseError } from "@/shared/errors/base-error";

export class DomainError extends BaseError {
  code = "DOMAIN_ERROR";
}
