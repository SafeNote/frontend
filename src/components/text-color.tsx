'use client';

import { MenuBarItem } from '@/components/menubar-item';
import { Editor } from '@tiptap/core';
import { Pipette } from 'lucide-react';
import { useRef } from 'react';

export const TextColor = ({ editor }: { editor: Editor }) => {
    const colorRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                ref={colorRef}
                type='color'
                onInput={event =>
                    editor
                        .chain()
                        .focus()
                        .setColor(event.currentTarget.value)
                        .run()
                }
                value={editor.getAttributes('textStyle').color}
                className='hidden'
            />
            <MenuBarItem
                label='Text Color'
                onClick={() => colorRef.current?.click()}>
                <Pipette
                    size={20}
                    style={{
                        color: editor.getAttributes('textStyle').color,
                    }}
                />
            </MenuBarItem>
        </>
    );
};
