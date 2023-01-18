'use client';

import { useAlertStore } from '@/components/alert';
import { CryptoService } from '@/services/crypto.worker';
import { wrap } from 'comlink';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();
    const addAlert = useAlertStore(state => state.addAlert);

    const newNote = useCallback(async () => {
        try {
            setLoading(true);
            const worker = new Worker(
                new URL('@/services/crypto.worker', import.meta.url),
                {
                    type: 'module',
                    name: 'safenote-crypto-worker',
                }
            );

            const crypto = wrap<typeof CryptoService>(worker);

            const { id, key } = await crypto.generateIdAndKey();
            push(`/${id}#${key}`);
            setLoading(true);
        } catch (error) {
            if (typeof error === 'string') {
                addAlert(`Error: ${error}`, 'error');
            } else if (error instanceof Error) {
                addAlert(`Error: ${error.message}`, 'error');
            }
            setLoading(false);
        }
    }, [addAlert, push]);

    return (
        <div className='flex h-[75vh] max-h-[75vh] items-center justify-center'>
            {loading ? (
                <Loader2 className='animate-spin text-brand' />
            ) : (
                <button
                    type='button'
                    className='button button-primary'
                    onClick={newNote}>
                    New Note
                </button>
            )}
        </div>
    );
};

export default Page;
