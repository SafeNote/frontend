import { SinglePost } from '@/components/blog/post';
import { client } from '@/sanity/sanity-client';
import { Post } from '@/sanity/types';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';

const query = groq`
    *[_type == "post" && site->title == "SafeNote" && slug.current == $slug] {
        _id,
        publishedAt,
        category-> {
            _id,
            description,
            title,
            slug,
        },
        tags[]-> {
            _id,
            description,
            title,
            slug,
        },
        image,
        author-> {
            _id,
            name,
            image,
            slug,
        },
        slug,
        title,
        body,
        excerpt
    }[0]
`;

const getPost = (slug: string) => client.fetch<Post | null>(query, { slug });

export const revalidate = 3600;

export const generateStaticParams = async () => {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(groq`
        *[_type == "post" && site->title == "SafeNote"] {
            slug { current }
        }
    `);

    return slugs.map(({ slug }) => ({
        slug: slug.current,
    }));
};

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
    const post = await getPost(slug);

    if (!post) {
        return notFound();
    }

    return <SinglePost post={post} />;
};

export default PostPage;
