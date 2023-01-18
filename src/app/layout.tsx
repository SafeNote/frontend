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
            className={clsx(
                process.env.NODE_ENV === 'development' && 'debug-screens'
            )}>
            <Providers>
                <div className='container mx-auto h-full space-y-8 p-4'>
                    <header className='flex h-12 items-center justify-between'>
                        <div>
                            <h1 className='text-xl font-bold'>
                                <span className='text-brand'>Safe</span>Note
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
                    <main>{children}</main>
                    <footer className='flex h-8 items-center justify-center text-center text-sm'>
                        &copy;{' '}
                        <span>
                            <span className='text-brand'>Safe</span>Note
                        </span>{' '}
                        - 2023
                    </footer>
                </div>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
