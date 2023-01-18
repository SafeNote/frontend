export const addServerErrors = <T>(
    errors: { [P in string]?: string[] }, // FIXME: introduce a better key type for auto-complete
    setError: (
        fieldName: keyof T,
        error: { type: string; message: string }
    ) => void,
    dataKeys: string[]
) => {
    const errorKeys = Object.keys(errors);
    const accumulatedErrors = errorKeys.map(key => ({
        key,
        errors: errors[key]!,
    }));

    // Field Errors
    accumulatedErrors
        .filter(e => dataKeys.includes(e.key))
        .map(e =>
            setError(e.key as keyof T, {
                type: 'server',
                message: e.errors.join(' '),
            })
        );

    // General Errors
    setError('errors' as keyof T, {
        type: 'server',
        message: accumulatedErrors
            .filter(e => !dataKeys.includes(e.key))
            .map(e => e.errors.join(' '))
            .join(' '),
    });
};
