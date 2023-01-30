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
    JSONContent,
    useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { lowlight } from 'lowlight';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlertStore } from './alert';

export const NotesEditor = ({
    noteData,
    saving,
    onSave,
}: {
    noteData: JSONContent | null;
    saving: boolean;
    onSave: (
        data: JSONContent,
        title: string,
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
        () => (noteData ? generateHTML(noteData, extensions) : ''),
        [extensions, noteData]
    );

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: clsx(
                    'bg-transparent prose max-w-full p-4',
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

    const addAlert = useAlertStore(state => state.addAlert);
    const [title, setTitle] = useState<string>(noteData?.title ?? '');
    useEffect(() => {
        setTitle(noteData?.title ?? '');
    }, [noteData]);

    const onSaveCallback = useCallback(
        async (isShare?: boolean) => {
            if (editor === null || saving) {
                return;
            }

            if (!title) {
                addAlert('Title is required.', 'info');
                return;
            }

            const message = isShare
                ? 'Url copied to your clipboard!'
                : undefined;

            await onSave(editor.getJSON(), title, message);

            if (isShare) {
                await navigator.clipboard.writeText(window.location.href);
                if (navigator.share) {
                    navigator.share({
                        url: window.location.href,
                        title: 'SafeNote',
                        text: title,
                    });
                }
            }
        },
        [addAlert, editor, onSave, saving, title]
    );

    useEffect(() => {
        const saveNoteCallback = async (ev: KeyboardEvent) => {
            if ((ev.metaKey || ev.ctrlKey) && ev.key === 's') {
                ev.preventDefault();
                await onSaveCallback();
            }
        };

        if (!saving && editor !== null) {
            document.addEventListener('keydown', saveNoteCallback);
        }

        return () => {
            document.removeEventListener('keydown', saveNoteCallback);
        };
    }, [editor, onSaveCallback, saving]);

    return (
        <div className='h-full space-y-4'>
            {editor ? (
                <div className='flex h-full flex-col justify-center gap-4'>
                    <div className='shrink-0 space-y-2'>
                        <MenuBar
                            saving={saving}
                            onSave={onSaveCallback}
                            editor={editor}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <input
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Enter a title...'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className='h-8 border-2 border-brand bg-transparent text-gray-700 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-offset-2 md:max-w-md'
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
