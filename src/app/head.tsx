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
        <meta name='description' content='SafeNote' />

        <meta name='theme-color' content='#4f46e5' />

        <meta
            property='og:description'
            content='SafeNote, opensource, end to end encrypted notes.'
        />
        <meta property='og:type' content='Website' />
        <meta property='og:title' content='SafeNote' />
        <meta
            property='og:image'
            content={`https://${
                process.env.NEXT_PUBLIC_DOMAIN ?? 'safenote.io'
            }/og-image.png`}
        />

        <meta
            name='twitter:description'
            content='SafeNote, opensource, end to end encrypted notes.'
        />
        <meta name='twitter:title' content='SafeNote' />
        <meta name='twitter:card' content='summary' />

        <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
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
            sizes='16x16'
            href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />

        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#4f46e5' />

        <title>SafeNote</title>
    </>
);

export default Head;
