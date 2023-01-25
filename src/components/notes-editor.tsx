'use client';

import { MenuBar } from '@/components/menubar';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import {
    EditorContent,
    Extensions,
    generateHTML,
    useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { lowlight } from 'lowlight';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export const NotesEditor = ({
    noteData,
    saving,
    onSave,
}: {
    noteData: string | null;
    saving: boolean;
    onSave: (
        data: string,
        successMessage?: string | undefined
    ) => Promise<void>;
}) => {
    const extensions: Extensions = useMemo(
        () => [
            StarterKit.configure({
                hardBreak: false,
                codeBlock: false,
            }),
            Underline,
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
            CharacterCount,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Image.configure({
                allowBase64: true,
            }),
            Youtube.configure({
                addPasteHandler: true,
                width: 640,
                height: 360,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Link,
            Typography,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        []
    );

    const content = useMemo(
        () => (noteData ? generateHTML(JSON.parse(noteData), extensions) : ''),
        [extensions, noteData]
    );

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: clsx(
                    'prose max-w-full p-4',
                    'h-[65vh] max-h-[65vh] overflow-y-auto rounded-md border-2 border-brand',
                    'focus:outline-none focus-within:ring-2 focus-within:ring-brand/75 focus-within:ring-offset-2',
                    '[&>*]:m-0'
                ),
            },
        },
        content,
    });

    useEffect(() => {
        editor?.commands.setContent(content);
    }, [editor, content]);

    return (
        <div className='h-full space-y-4'>
            {editor ? (
                <div className='flex h-full flex-col justify-center gap-4'>
                    <div className='shrink-0'>
                        <MenuBar
                            saving={saving}
                            onSave={onSave}
                            editor={editor}
                        />
                    </div>
                    <EditorContent
                        className='h-full flex-auto'
                        editor={editor}
                    />
                    <div className='shrink-0 space-x-2 text-right'>
                        <span>
                            {editor?.storage.characterCount.characters()}{' '}
                            characters
                        </span>
                        <span>|</span>
                        <span>
                            {editor?.storage.characterCount.words()} words
                        </span>
                    </div>
                </div>
            ) : (
                <div className='flex h-full items-center justify-center overflow-y-auto'>
                    <Loader2 className='animate-spin text-brand' />
                </div>
            )}
        </div>
    );
};
