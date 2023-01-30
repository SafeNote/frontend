'use client';

import '@/styles/highlightjs.css';
import '@/styles/prosemirror.css';

import { useAlertStore } from '@/components/alert';
import { NotesEditor } from '@/components/notes-editor';
import { useLinkStore } from '@/hooks/use-link-store';
import { CryptoService } from '@/services/crypto.worker';
import { createOrGetNote, deleteNote, saveNote } from '@/services/notes';
import { JSONContent } from '@tiptap/core';
import { wrap } from 'comlink';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const NotePage = ({ params: { id } }: { params: { id: string } }) => {
    const { push } = useRouter();

    const [loading, setLoading] = useState(true);
    const addOrUpdateLink = useLinkStore(state => state.addOrUpdateLink);
    const removeLink = useLinkStore(state => state.removeLink);
    const addAlert = useAlertStore(state => state.addAlert);

    const [noteData, setNoteData] = useState<JSONContent | null>(null);

    useEffect(() => {
        const key = window.location.hash.slice(1);
        if (!key) {
            return () => {};
        }

        const controller = new AbortController();
        const createOrGet = async () => {
            try {
                setLoading(true);
                const worker = new Worker(
                    new URL('@/services/crypto.worker', import.meta.url),
                    {
                        type: 'module',
                        name: 'safenote-crypto-worker',
                    }
                );

                const crypto = wrap<typeof CryptoService>(worker);

                const hash = await crypto.getHash(key);
                const result = await createOrGetNote(
                    id,
                    {
                        keyHash: hash,
                    },
                    controller.signal
                );

                if (result.success) {
                    if (
                        result.data.action === 'CREATE' ||
                        !result.data.dataBundle.encryptedData
                    ) {
                        return;
                    }

                    if (!result.data.dataBundle.nonce) {
                        addAlert('Nonce not found!', 'error');
                        push('/');
                        return;
                    }

                    const data = await crypto.decrypt(
                        key,
                        result.data.dataBundle.nonce,
                        result.data.dataBundle.encryptedData
                    );

                    if (!data) {
                        setNoteData(null);
                        return;
                    }

                    setNoteData(JSON.parse(data));
                    return;
                }

                // eslint-disable-next-line no-console
                console.error(result.errors);
                addAlert('Something went wrong!', 'error');
                push('/');
            } catch (error) {
                if (typeof error === 'string') {
                    addAlert(`Error: ${error}`, 'error');
                    push('/');
                    return;
                }

                if (error instanceof Error && error.name !== 'AbortError') {
                    addAlert(`Error: ${error.message}`, 'error');
                    push('/');
                    return;
                }
            } finally {
                setLoading(false);
            }
        };

        createOrGet();
        return () => {
            controller.abort();
        };
    }, [addAlert, id, push]);

    const [saving, setSaving] = useState(false);

    const onSave = useCallback(
        async (data: JSONContent, title: string, successMessage?: string) => {
            try {
                const key = window.location.hash.slice(1);
                if (!key) {
                    push('/');
                    return;
                }

                setSaving(true);
                const worker = new Worker(
                    new URL('@/services/crypto.worker', import.meta.url),
                    {
                        type: 'module',
                        name: 'safenote-crypto-worker',
                    }
                );

                const crypto = wrap<typeof CryptoService>(worker);

                const hash = await crypto.getHash(key);
                const { encryptedData, nonce } = await crypto.encrypt(
                    key,
                    data ? JSON.stringify({ ...data, title }) : ''
                );
                const result = await saveNote(id, {
                    keyHash: hash,
                    encryptedData,
                    nonce,
                });

                if (result.success) {
                    addOrUpdateLink(id, key, title);
                    addAlert(successMessage ?? 'Note saved!', 'success');
                    return;
                }

                // eslint-disable-next-line no-console
                console.error(result.errors);
                addAlert(
                    'Something went wrong while saving the note!',
                    'error'
                );
            } catch (error) {
                addAlert(
                    `Error saving note: ${
                        error instanceof Error
                            ? error.message
                            : (error as string)
                    }`,
                    'error'
                );
            } finally {
                setSaving(false);
            }
        },
        [addAlert, addOrUpdateLink, id, push]
    );

    const onDelete = useCallback(async () => {
        try {
            const key = window.location.hash.slice(1);
            if (!key) {
                push('/');
                return;
            }

            setSaving(true);
            const worker = new Worker(
                new URL('@/services/crypto.worker', import.meta.url),
                {
                    type: 'module',
                    name: 'safenote-crypto-worker',
                }
            );

            const crypto = wrap<typeof CryptoService>(worker);
            const hash = await crypto.getHash(key);
            const result = await deleteNote(id, hash);

            if (result.success) {
                removeLink(id);
                addAlert('Note deleted!', 'success');
                push('/');
                return;
            }

            // eslint-disable-next-line no-console
            console.error(result.errors);
            addAlert('Something went wrong while deleting the note!', 'error');
        } catch (error) {
            addAlert(
                `Error deleting note: ${
                    error instanceof Error ? error.message : (error as string)
                }`,
                'error'
            );
        } finally {
            setSaving(false);
        }
    }, [addAlert, id, push, removeLink]);

    return loading ? (
        <div className='flex h-full items-center justify-center'>
            <Loader2 className='animate-spin text-brand' />
        </div>
    ) : (
        <NotesEditor
            saving={saving}
            onSave={onSave}
            onDelete={onDelete}
            noteData={noteData}
        />
    );
};

export default NotePage;
