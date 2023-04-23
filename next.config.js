/** @type {import('next').NextConfig} */
module.exports = {
    // output: 'standalone', // Uncomment this for node based deployments
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'dummyimage.com',
            'images.unsplash.com',
            'safenote.io',
            process.env.NEXT_PUBLIC_DOMAIN ?? 'safenote.io',
        ],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        appDir: true,
        nextScriptWorkers: true,
        newNextLinkBehavior: true,
        fontLoaders: [
            {
                loader: '@next/font/google',
                options: {
                    subsets: ['latin'],
                },
            },
        ],
    },
};
