export type Errors<T> = { [P in keyof T]?: string[] };

export type SuccessResponse<U> = {
    success: true;
    data: U;
};

export type ErrorResponse<T> = {
    success: false;
    errors: Errors<T>;
};

export type ResponseMessage<T, U> = SuccessResponse<U> | ErrorResponse<T>;

export const getErrors = async <T>(
    response: Response,
    defaultError = 'Something went wrong!'
): Promise<Errors<T>> => {
    const isJsonProblem = response.headers
        .get('Content-Type')
        ?.includes('application/problem+json');
    const data = isJsonProblem ? await response.json() : null;
    const responseErrors = data?.errors ?? {
        errors: [defaultError],
    };

    return responseErrors;
};
