export class ApiError extends Error {
    constructor(errors, statusCode) {
        super(errors);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(errors) {
        super(errors, 400);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(errors) {
        super(errors, 401);
    }
}

export class NotFoundError extends ApiError {
    constructor(errors) {
        super(errors, 404);
    }
}
