import { Tooltip } from '@/components/tooltip';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

export const MenuBarItem: FC<
    PropsWithChildren<{
        label?: string;
        disabled?: boolean;
        onClick: () => void;
        isActive?: boolean;
    }>
> = ({ label, disabled, onClick, isActive, children }) => {
    if (!label) {
        return (
            <button
                type='button'
                onClick={onClick}
                disabled={disabled}
                className={clsx(
                    'rounded px-1.5 py-1',
                    'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:bg-opacity-80 disabled:text-gray-600',
                    isActive &&
                        'bg-brand text-white focus-visible:ring-brand/75',
                    !isActive &&
                        'bg-gray-300 text-gray-600 focus-visible:ring-gray-300/75'
                )}>
                <span className='sr-only'>{label}</span>
                {children}
            </button>
        );
    }

    return (
        <Tooltip label={label} dark>
            <button
                type='button'
                onClick={onClick}
                disabled={disabled}
                className={clsx(
                    'rounded px-1.5 py-1',
                    isActive &&
                        'bg-brand text-white focus-visible:ring-brand/75',
                    !isActive &&
                        'bg-gray-300 text-gray-600 focus-visible:ring-gray-300/75'
                )}>
                <span className='sr-only'>{label}</span>
                {children}
            </button>
        </Tooltip>
    );
};
