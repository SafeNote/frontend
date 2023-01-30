'use client';

import { useAlertStore } from '@/components/alert';
import { useLinkStore } from '@/hooks/use-link-store';
import { CryptoService } from '@/services/crypto.worker';
import { wrap } from 'comlink';
import { formatDistanceToNow } from 'date-fns';
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

    const links = useLinkStore(state => state.links);

    if (loading) {
        return (
            <div className='flex h-full items-center justify-center'>
                <Loader2 className='animate-spin text-brand' />
            </div>
        );
    }

    if (links.length <= 0) {
        return (
            <div className='flex h-full items-center justify-center'>
                <div className='prose prose-base text-sm'>
                    <blockquote className='space-y-2 md:space-y-4'>
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
                            ensure the security and privacy of your notes. It
                            does not require an account, so you can start using
                            it right away. The encryption used in SafeNote is
                            the strongest available which provides a great peace
                            of mind knowing that your notes are protected from
                            prying eyes. It&apos;s a great tool for anyone
                            looking for a secure and reliable online notepad.
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
            </div>
        );
    }

    return (
        <div className='flex h-full items-center justify-center'>
            <ul className='grid w-full gap-4 lg:grid-cols-3'>
                {links
                    .sort(
                        (a, b) =>
                            new Date(a.modifiedAt).getTime() -
                            new Date(b.modifiedAt).getTime()
                    )
                    .map(link => (
                        <li key={link.id} className='flex w-full'>
                            <Link
                                href={link.key}
                                className='flex h-full w-full flex-col justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm shadow transition-all hover:shadow-lg'>
                                <div className='flex gap-1'>
                                    <span className='font-bold'>Title:</span>
                                    <span>{link.title}</span>
                                </div>
                                <div className='flex gap-1'>
                                    <span className='font-bold'>
                                        Date Created:
                                    </span>
                                    <span>
                                        {formatDistanceToNow(
                                            new Date(link.createdAt),
                                            {
                                                includeSeconds: true,
                                                addSuffix: true,
                                            }
                                        )}
                                    </span>
                                </div>
                                <div className='flex gap-1'>
                                    <span className='font-bold'>
                                        Date Modified:
                                    </span>
                                    <span>
                                        {formatDistanceToNow(
                                            new Date(link.modifiedAt),
                                            {
                                                includeSeconds: true,
                                                addSuffix: true,
                                            }
                                        )}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Page;
