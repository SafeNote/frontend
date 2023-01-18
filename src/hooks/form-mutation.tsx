import { addServerErrors } from '@/utils/addServerErrors';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useFormMutation = <T, U>(
    onSubmit: (data: T) => Promise<U>,
    setError: (
        fieldName: keyof T,
        error: { type: string; message: string }
    ) => void,
    options?: Omit<
        UseMutationOptions<U, unknown, T, unknown>,
        'mutationFn' | 'onError'
    >
) =>
    useMutation<U, unknown, T, unknown>({
        ...options,
        mutationFn: onSubmit,
        onError(error, variables, _context) {
            const message = error
                ? (error as Error).message
                : 'Something went wrong!';
            addServerErrors(
                { errors: [message] },
                setError,
                Object.keys(variables as object)
            );
        },
    });
