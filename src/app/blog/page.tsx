import List from '@/components/blog/list';
import { client } from '@/sanity/sanity-client';
import { Post } from '@/sanity/types';
import { groq } from 'next-sanity';

export const revalidate = 3600;

const query = groq`
    *[_type == "post" && site->title == "SafeNote"] {
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
    } | order(publishedAt desc, _createdAt desc)
`;

const getPosts = () => client.fetch<Post[]>(query);

const BlogPage = async () => {
    const posts = await getPosts();
    return <List posts={posts} />;
};

export default BlogPage;
