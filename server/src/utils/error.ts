export default class ApiError extends Error {

    constructor(
        public readonly status: number,
        public readonly message: string,
        public readonly errors: any | any[],
    ) {
        super(message);
    }

    badRequest(message: string, errors = []) {
        return new ApiError(400, message, errors);
    }

    unauthorized(errors = []) {
        return new ApiError(401, 'You are not authorized', errors);
    }

    forbidden(message: string = 'You don\'t have access', errors = []) {
        return new ApiError(403, message, errors);
    }
}