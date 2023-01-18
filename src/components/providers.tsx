'use client';

import { AlertList } from '@/components/alert';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools position='top-right' initialIsOpen={false} /> */}
        <AlertList />
        {children}
    </QueryClientProvider>
);
