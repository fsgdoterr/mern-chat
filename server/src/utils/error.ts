export default class ApiError extends Error {

    constructor(
        public readonly status: number,
        public readonly message: string,
        public readonly errors: any[],
    ) {
        super(message);
    }

    static badRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(errors: any[] = []) {
        return new ApiError(401, 'You are not authorized', errors);
    }

    static forbidden(message: string = 'You don\'t have access', errors: any[] = []) {
        return new ApiError(403, message, errors);
    }

    getError() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
        }
    }
}