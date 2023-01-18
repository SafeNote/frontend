'use client';

import { useAlertStore } from '@/components/alert';
import { CryptoService } from '@/services/crypto.worker';
import { wrap } from 'comlink';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
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
            push(`/${id}#${key}`, {
                forceOptimisticNavigation: true,
            });
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
                <div className='prose prose-base'>
                    <blockquote className='space-y-4'>
                        <div className='font-bold'>
                            Hey ChatGPT, introduce SafeNote to the world!
                        </div>
                        <div>
                            SafeNote is a free and{' '}
                            <Link
                                href='https://github.com/SafeNote'
                                target='_blank'
                                rel='noreferrer'
                                className='text-brand'>
                                open-source
                            </Link>{' '}
                            online notepad that offers end-to-end encryption to
                            ensure the security and privacy of your notes. With
                            SafeNote, you can take notes for various purposes
                            such as work, school, or personal use without any
                            worries about the security of your data. It does not
                            require an account, so you can start using it right
                            away. The encryption used in SafeNote is the
                            strongest available which provides a great peace of
                            mind knowing that your notes are protected from
                            prying eyes. You can store, edit, and share your
                            notes with complete confidence. It&apos;s a great
                            tool for anyone looking for a secure and reliable
                            online notepad.
                        </div>
                        <div>- ChatGPT</div>
                    </blockquote>
                    <button
                        type='button'
                        className='button button-primary'
                        onClick={newNote}>
                        Create A Note
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;
