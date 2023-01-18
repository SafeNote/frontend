import {
    Arrow,
    Content,
    Portal,
    Provider,
    Root,
    Trigger,
} from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

export const Tooltip: FC<
    PropsWithChildren<{ label: string; dark: boolean }>
> = ({ children, label, dark }) => (
    <Provider>
        <Root>
            <Trigger asChild>{children}</Trigger>
            <Portal>
                <Content
                    className={clsx(
                        'select-none rounded py-2 px-3 text-sm leading-4 shadow-lg duration-500',
                        {
                            'bg-gray-900 text-white': dark,
                            'bg-white text-gray-900': !dark,
                        }
                    )}
                    sideOffset={5}>
                    {label}
                    <Arrow
                        className={clsx({
                            'fill-gray-900': dark,
                            'fill-white': !dark,
                        })}
                    />
                </Content>
            </Portal>
        </Root>
    </Provider>
);
