import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Link = {
    id: string;
    key: string;
    title: string;
    modifiedAt: string;
    createdAt: string;
};

export type LinkStoreState = {
    links: Link[];
};

export type LinkStoreActions = {
    addOrUpdateLink: (id: string, key: string, title: string) => void;
    removeLink: (id: string) => void;
};

export const useLinkStore = create<LinkStoreState & LinkStoreActions>()(
    persist(
        (set, get) => ({
            links: [],
            addOrUpdateLink: (id: string, key: string, title: string) => {
                const now = new Date().toUTCString();

                const { links } = get();
                const oldLink = links.find(l => l.id === id);

                if (oldLink) {
                    set({
                        links: [
                            ...links.filter(l => l.id !== id),
                            { ...oldLink, key, title, modifiedAt: now },
                        ],
                    });
                    return;
                }

                set({
                    links: [
                        ...links,
                        {
                            id,
                            key,
                            createdAt: now,
                            modifiedAt: now,
                            title,
                        },
                    ],
                });
            },
            removeLink: (id: string) =>
                set({ links: get().links.filter(link => link.id !== id) }),
        }),
        {
            name: 'link-store',
        }
    )
);

const withStorageDOMEvents = (store: typeof useLinkStore) => {
    const storageEventCallback = (e: StorageEvent) => {
        if (e.key === store.persist.getOptions().name && e.newValue) {
            store.persist.rehydrate();
        }
    };

    if (typeof window === 'undefined') {
        return () => {};
    }

    window.addEventListener('storage', storageEventCallback);

    return () => {
        window.removeEventListener('storage', storageEventCallback);
    };
};

withStorageDOMEvents(useLinkStore);
