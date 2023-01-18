import { apiRoutes } from '@/data/routes';
import { getErrors, ResponseMessage } from '@/services/common';

export type DataBundle = {
    nonce?: string;
    keyHash: string;
    encryptedData?: string;
};

export const createOrGetNote = async <T>(
    id: string | null,
    dataBundle: DataBundle,
    signal?: AbortSignal
): Promise<
    ResponseMessage<
        T,
        { id: string; dataBundle: DataBundle; action: 'CREATE' | 'GET' }
    >
> => {
    const response = await fetch(apiRoutes.note.createOrGet, {
        method: 'POST',
        body: JSON.stringify({
            id,
            dataBundle,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    }

    const errors = await getErrors<T>(response);
    return { success: false, errors };
};

export const deleteNote = async <T>(
    id: string,
    hash: string
): Promise<ResponseMessage<T, { id: string }>> => {
    const response = await fetch(`${apiRoutes.note.delete}/${id}/${hash}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    }

    const errors = await getErrors<T>(response);
    return { success: false, errors };
};

export const saveNote = async <T>(
    id: string,
    dataBundle: DataBundle
): Promise<ResponseMessage<T, undefined>> => {
    const response = await fetch(apiRoutes.note.save, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            dataBundle,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return { success: true, data: undefined };
    }

    const errors = await getErrors<T>(response);
    return { success: false, errors };
};
