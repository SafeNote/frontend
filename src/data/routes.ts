export const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? 'https://api.safenote.io';

export const clientRoutes = {
    index: '/',
    privacy: '/privacy',
    terms: '/terms',
};

const nakedApiRoutes = {
    note: {
        createOrGet: '/note/create-or-get',
        delete: '/note/delete',
        save: '/note/save',
    },
};

export const apiRoutes = {
    note: {
        createOrGet: apiUrl + nakedApiRoutes.note.createOrGet,
        delete: apiUrl + nakedApiRoutes.note.delete,
        save: apiUrl + nakedApiRoutes.note.save,
    },
};

export default {
    api: apiRoutes,
    client: clientRoutes,
};
