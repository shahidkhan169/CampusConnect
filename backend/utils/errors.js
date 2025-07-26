export class GeneralError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    getCode() {
        if (this instanceof BadRequest) return 400;
        if (this instanceof NotFound) return 404;
        if (this instanceof Forbidden) return 403;
        if (this instanceof Unauthorized) return 401;
        if (this instanceof DBError) return 500;
        return 500;
    }
}

export class BadRequest extends GeneralError {
    constructor(message, details = {}) {
        super(message);
        this.details = details;
    }
}

export class NotFound extends GeneralError {}
export class Forbidden extends GeneralError {}
export class Unauthorized extends GeneralError {}
export class DBError extends GeneralError {}
