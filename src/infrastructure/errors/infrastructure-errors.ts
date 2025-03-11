import { BaseError } from "@/shared/errors/base-error";

export class InfrastructureError extends BaseError {
  code = "INFRASTRUCUTRE_ERROR";
}

export class StorageWriteError extends InfrastructureError {
  code = "STORAGE_WRITE_ERROR";
}

export class StorageLoadError extends InfrastructureError {
  code = "STORAGE_LOAD_ERROR";
}
