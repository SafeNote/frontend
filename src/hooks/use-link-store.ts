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
    addLink: (link: Link) => void;
    removeLink: (id: string) => void;
};

export const useLinkStore = create<LinkStoreState & LinkStoreActions>()(
    persist(
        (set, get) => ({
            links: [
                {
                    id: '1',
                    key: 'KEY',
                    title: 'TITLE asd asd asd asd asd asdas dasd asd asd sadas asd das dasd adasd asd das dasd dasda',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
                {
                    id: '2',
                    key: 'KEY',
                    title: 'TITLE',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
                {
                    id: '3',
                    key: 'KEY',
                    title: 'TITLE',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
                {
                    id: '4',
                    key: 'KEY',
                    title: 'TITLE',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
                {
                    id: '5',
                    key: 'KEY',
                    title: 'TITLE',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
                {
                    id: '6',
                    key: 'KEY',
                    title: 'TITLE',
                    createdAt: new Date().toDateString(),
                    modifiedAt: new Date().toDateString(),
                },
            ],
            addLink: (link: Link) => set({ links: [...get().links, link] }),
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
