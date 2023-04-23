import { Providers } from '@/components/providers';
import clsx from 'clsx';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import '@/styles/tw.css';

export const metadata = {
    title: {
        default: 'SafeNote',
        template: '%s',
    },
    keywords: 'SafeNote',
    description:
        'SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.',
    robots: {
        index: true,
        follow: true,
    },
    themeColor: '#4f46e5',
    metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN}`),
    manifest: '/manifest.json',
    openGraph: {
        description:
            'SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.',
        type: 'website',
        title: {
            default: 'SafeNote',
            template: '%s',
        },
        images: '/icon.png',
    },
    twitter: {
        description:
            'SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.',
        title: {
            default: 'SafeNote',
            template: '%s',
        },
        card: 'summary',
        creator: '@SafeNoteIO',
        images: '/android-icon-192x192.png',
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/favicon-96x96.png',
        apple: '/apple-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon-precomposed.png',
        },
    },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang='en' dir='ltr'>
        <head />
        <body
            className={clsx({
                'debug-screens': process.env.NODE_ENV === 'development',
            })}>
            <Providers>
                <header className='flex h-12 shrink-0 items-center justify-between gap-1 py-3'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            <Link href='/'>
                                <span className='text-brand'>Safe</span>
                                Note
                            </Link>
                        </h1>
                        <div className='text-sm'>
                            Opensource, end to end encrypted notes.
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link
                            href='https://github.com/SafeNote'
                            target='_blank'
                            rel='noreferrer'>
                            <Github
                                size={18}
                                className='duration-200 ease-out hover:text-brand'
                            />
                        </Link>
                        <Link
                            href='https://twitter.com/SafeNoteIO'
                            target='_blank'
                            rel='noreferrer'>
                            <Twitter
                                size={18}
                                className='duration-200 ease-out hover:text-brand'
                            />
                        </Link>
                    </div>
                </header>
                <main className='relative flex-auto'>{children}</main>
                <footer className='flex h-8 shrink-0 items-center justify-center gap-1 py-2 text-center text-sm'>
                    <span>&copy;</span>
                    <span>
                        <span className='text-brand'>Safe</span>Note
                    </span>
                    <span>- 2023</span>
                </footer>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
