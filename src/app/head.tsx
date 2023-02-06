const Head = () => (
    <>
        <meta
            name='viewport'
            content='minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

        <meta name='robots' content='index, follow' />

        <meta name='keywords' content='SafeNote' />
        <meta
            name='description'
            content='SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.'
        />

        <meta name='theme-color' content='#4f46e5' />

        <meta
            property='og:description'
            content='SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.'
        />
        <meta property='og:type' content='Website' />
        <meta property='og:title' content='SafeNote' />
        <meta
            property='og:image'
            content={`https://${
                process.env.NEXT_PUBLIC_DOMAIN ?? 'safenote.io'
            }/android-chrome-512x512.png`}
        />

        <meta
            name='twitter:description'
            content='SafeNote is a free and opensource online notepad that offers end-to-end encryption to ensure the security and privacy of your notes.'
        />
        <meta name='twitter:title' content='SafeNote' />
        <meta name='twitter:card' content='summary' />

        <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='/apple-icon-57x57.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='/apple-icon-60x60.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='/apple-icon-72x72.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/apple-icon-76x76.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/apple-icon-114x114.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/apple-icon-120x120.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/apple-icon-144x144.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/apple-icon-152x152.png'
        />
        <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-icon-180x180.png'
        />
        <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/android-icon-192x192.png'
        />
        <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
        />
        <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/favicon-96x96.png'
        />
        <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#4f46e5' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#4f46e5' />

        <title>SafeNote</title>
    </>
);

export default Head;
