export default interface IApiError {
    status: number;
    message: string;
    errors: {message: string, field: string}[];
}