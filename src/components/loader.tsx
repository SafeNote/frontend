import { Loader2 } from 'lucide-react';

export const Loader = () => (
    <div className='absolute inset-0 flex h-full items-center justify-center'>
        <Loader2 className='animate-spin text-brand-600' />
    </div>
);
