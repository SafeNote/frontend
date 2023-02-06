import { client } from '@/sanity/sanity-client';
import { groq } from 'next-sanity';

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
    const post = await client.fetch<{ title: string }>(
        groq`
            *[_type == "post" && site->title == "SafeNote" && slug.current == $slug] {
                title
            }[0]
        `,
        { slug }
    );

    return <title>{post?.title ?? 'SafeNote Blog'}</title>;
};

export default Head;
