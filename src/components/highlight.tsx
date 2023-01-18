'use client';

import { MenuBarItem } from '@/components/menubar-item';
import { Editor } from '@tiptap/core';
import { Brush, Highlighter } from 'lucide-react';
import { useRef, useState } from 'react';

export const Highlight = ({ editor }: { editor: Editor }) => {
    const colorRef = useRef<HTMLInputElement>(null);
    const [color, setColor] = useState('#f8ff00');

    return (
        <>
            <input
                ref={colorRef}
                type='color'
                onInput={event => {
                    setColor(event.currentTarget.value);

                    editor
                        .chain()
                        .focus()
                        .toggleHighlight({
                            color: event.currentTarget.value,
                        })
                        .run();
                }}
                value={editor.getAttributes('highlight').color}
                className='hidden'
            />
            <MenuBarItem
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive('highlight')}>
                <div className='flex items-center gap-1'>
                    <span>Highlight</span>
                    <Highlighter size={20} />
                </div>
            </MenuBarItem>
            <MenuBarItem
                onClick={() => colorRef.current?.click()}
                isActive={editor.isActive('highlight')}>
                <div className='flex items-center gap-1'>
                    <span>Highlight Color</span>
                    <Brush
                        size={20}
                        style={{
                            color,
                            fill: color,
                        }}
                    />
                </div>
            </MenuBarItem>
        </>
    );
};
