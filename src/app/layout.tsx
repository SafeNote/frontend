import { Providers } from '@/components/providers';
import '@/styles/tw.css';
import { Inter } from '@next/font/google';
import clsx from 'clsx';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang='en' dir='ltr' className={clsx(inter.variable)}>
        <head />
        <body
            className={clsx({
                'debug-screens': process.env.NODE_ENV === 'development',
            })}>
            <Providers>
                <div className='container mx-auto flex h-full flex-col justify-center gap-4 p-4 md:gap-8'>
                    <header className='flex shrink-0 basis-12 items-center justify-between gap-1 py-3'>
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
                        <div className='flex items-center gap-2'>
                            <Link
                                href='https://github.com/SafeNote'
                                target='_blank'
                                rel='noreferrer'>
                                <Github />
                            </Link>
                            <Link
                                href='https://twitter.com/SafeNoteIO'
                                target='_blank'
                                rel='noreferrer'>
                                <Twitter />
                            </Link>
                        </div>
                    </header>
                    <main className='flex-auto basis-auto'>{children}</main>
                    <footer className='flex shrink-0 basis-8 items-center justify-center gap-1 py-2 text-center text-sm'>
                        <span>&copy;</span>
                        <span>
                            <span className='text-brand'>Safe</span>Note
                        </span>
                        <span>- 2023</span>
                    </footer>
                </div>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
