export class CustomError extends Error {
  constructor(errors, statusCode) {
    super();
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends CustomError {
  constructor(errors) {
    super(errors, 400);
  }
}

export class PermissionError extends CustomError {
  static message = "Permission denied";

  constructor(errors) {
    super(errors, 403);
    this.message = PermissionError.message;
  }
}

export class NotFoundError extends CustomError {
  static message = "Not found";

  constructor(errors) {
    super(errors, 404);
    this.message = NotFoundError.message;
  }
}

// eslint-disable-next-line no-unused-vars
export const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.errors });
  } else {
    console.error("Internal server error", { error: err.message || err + "" });
    res.status(500).json({ "": "Internal server error" });
  }
};
