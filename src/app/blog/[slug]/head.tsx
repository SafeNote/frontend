import { client } from '@/sanity/sanity-client';
import { Image } from '@/sanity/types';
import { urlFor } from '@/sanity/url-for';
import { groq } from 'next-sanity';

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
    const post = await client.fetch<{
        title: string;
        excerpt: string;
        image: Image;
        tags: {
            title: string;
        }[];
    }>(
        groq`
            *[_type == "post" && site->title == "SafeNote" && slug.current == $slug] {
                title,
                excerpt,
                image,
                tags[]->{
                    title,
                }
            }[0]
        `,
        { slug }
    );

    if (!post) {
        return null;
    }

    return (
        <>
            {post.tags && post.tags.length > 0 && (
                <meta
                    name='keywords'
                    content={post.tags.map(p => p.title).join(', ')}
                />
            )}

            {post.title && (
                <>
                    <meta name='og:title' content={post.title} />
                    <meta name='twitter:title' content={post.title} />
                    <title>{post.title}</title>
                </>
            )}

            {post.excerpt && (
                <>
                    <meta name='description' content={post.excerpt} />
                    <meta name='og:description' content={post.excerpt} />
                    <meta name='twitter:description' content={post.excerpt} />
                </>
            )}

            {post.image && (
                <meta
                    property='og:image'
                    content={urlFor(post.image).width(500).url()}
                />
            )}
        </>
    );
};

export default Head;
