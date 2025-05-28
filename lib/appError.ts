export class AppError extends Error {
  code?: number;
  errors?: string[];

  constructor({
    message = "Something went wrong",
    code,
    errors = [],
  }: {
    message: string;
    code?: number;
    errors?: string[];
  }) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.errors = errors;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
