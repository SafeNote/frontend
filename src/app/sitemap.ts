export default async function Sitemap() {
    const routes = [''].map(route => ({
        url: `https://${process.env.NEXT_PUBLIC_DOMAIN}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return routes;
}
