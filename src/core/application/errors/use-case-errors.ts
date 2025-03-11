import { BaseError } from "@/shared/errors/base-error";

export class UseCaseError extends BaseError {
  code = "USE_CASE_ERROR";
}
