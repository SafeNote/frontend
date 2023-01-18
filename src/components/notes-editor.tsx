'use client';

import { MenuBar } from '@/components/menubar';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
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
import { useAlertStore } from './alert';

export const NotesEditor = ({
    noteData,
    saving,
    onSave,
}: {
    noteData: string | null;
    saving: boolean;
    onSave: (daat: string) => void;
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
                    'h-[75vh] max-h-[75vh] overflow-y-auto rounded-md border-2 border-brand',
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

    const addAlert = useAlertStore(state => state.addAlert);

    return (
        <div className='relative h-full space-y-4'>
            {editor ? (
                <>
                    <MenuBar
                        saving={saving}
                        onSave={onSave}
                        addAlert={addAlert}
                        editor={editor}
                    />
                    <EditorContent className='h-full' editor={editor} />
                    <div className='absolute bottom-4 right-4 text-right'>
                        {editor?.storage.characterCount.characters()} characters
                        <br />
                        {editor?.storage.characterCount.words()} words
                    </div>
                </>
            ) : (
                <div className='flex h-[75vh] max-h-[75vh] items-center justify-center overflow-y-auto'>
                    <Loader2 className='animate-spin text-brand' />
                </div>
            )}
        </div>
    );
};