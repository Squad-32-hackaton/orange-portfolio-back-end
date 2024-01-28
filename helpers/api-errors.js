export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}

export class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
