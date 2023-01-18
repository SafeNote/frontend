'use client';

import {
    CheckIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { v4 } from 'uuid';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

export type AlertType = 'warning' | 'success' | 'error' | 'info';

export type Alert = { id: string; message: string; type: AlertType };

export type AlertState = {
    alerts: Alert[];
};

export type AlertActions = {
    removeAlert: (id: string) => void;
    addAlert: (message: string, type?: AlertType, dismissInMs?: number) => void;
};

const initialAlertState: AlertState = {
    alerts: [],
};

export const useAlertStore = create<AlertState & AlertActions>()(
    (set, get) => ({
        ...initialAlertState,
        addAlert: (message, type = 'info', dismissInMs = 3000) => {
            const id = v4();
            set({ alerts: [{ id, message, type }, ...get().alerts] });
            setTimeout(() => get().removeAlert(id), dismissInMs);
        },
        removeAlert: id =>
            set({ alerts: get().alerts.filter(alert => alert.id !== id) }),
    })
);

export const AlertItem = ({
    alert,
    close,
}: {
    alert: Alert;
    close: () => void;
}) => (
    <div className='flex items-center justify-between overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='flex items-center gap-3'>
            <div
                className={clsx(
                    'grid h-12 w-16 place-items-center',
                    alert.type === 'info' && 'bg-blue-200',
                    alert.type === 'warning' && 'bg-yellow-200',
                    alert.type === 'error' && 'bg-red-200',
                    alert.type === 'success' && 'bg-green-200'
                )}>
                {alert.type === 'info' && (
                    <InformationCircleIcon
                        className='w-6 text-blue-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'warning' && (
                    <ExclamationCircleIcon
                        className='w-6 text-yellow-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'error' && (
                    <ExclamationTriangleIcon
                        className='w-6 text-red-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'success' && (
                    <CheckIcon className='w-6 text-green-600' strokeWidth={2} />
                )}
            </div>
            <div className='w-full text-sm font-bold'>{alert.message}</div>
        </div>
        <button
            type='button'
            className='grid h-12 w-12 place-items-center hover:bg-gray-300'
            onClick={close}>
            <X size={24} />
        </button>
    </div>
);

export const AlertItem2 = ({
    alert,
    close,
}: {
    alert: Alert;
    close: () => void;
}) => (
    <div className='flex flex-col justify-center overflow-hidden rounded-md text-white shadow-lg shadow-gray-700'>
        <header className='flex w-full items-center justify-between bg-gray-700 p-2'>
            <div className='flex items-center gap-2'>
                {alert.type === 'info' && (
                    <InformationCircleIcon
                        className='w-5 text-blue-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'warning' && (
                    <ExclamationCircleIcon
                        className='w-5 text-yellow-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'error' && (
                    <ExclamationTriangleIcon
                        className='w-5 text-red-600'
                        strokeWidth={2}
                    />
                )}
                {alert.type === 'success' && (
                    <CheckIcon className='w-5 text-green-600' strokeWidth={2} />
                )}
                <span className='font-bold'>
                    {`${alert.type
                        .at(0)
                        ?.toLocaleUpperCase()}${alert.type.slice(1)}!`}
                </span>
            </div>
            <button type='button' onClick={close}>
                <X size={20} />
            </button>
        </header>
        <section className='break-words bg-gray-700/75 p-2 px-4 font-medium backdrop-blur'>
            {alert.message}
        </section>
    </div>
);

export const AlertList = () => {
    const alertsStore = useAlertStore(state => state, shallow);

    return (
        <div
            className='fixed left-1/2 top-6 z-30 w-full max-w-xs -translate-x-1/2 space-y-3'
            role='alert'>
            {alertsStore.alerts.map(alert => (
                <AlertItem2
                    key={alert.id}
                    alert={alert}
                    close={() => alertsStore.removeAlert(alert.id)}
                />
            ))}
        </div>
    );
};
