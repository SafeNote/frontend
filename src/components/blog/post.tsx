import { PortableTextComponents } from '@/components/sanity/portable-text-components';
import { Post } from '@/sanity/types';
import { urlFor } from '@/sanity/url-for';
import { PortableText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import Link from 'next/link';

export const SinglePost = ({ post }: { post: Post }) => (
    <ul className='my-8 mx-auto flex max-w-prose flex-col items-center gap-8'>
        <div className='relative h-64 w-full overflow-hidden rounded-lg'>
            <Image
                src={urlFor(post.image).width(500).url()}
                alt={post.title}
                placeholder='blur'
                blurDataURL={urlFor(post.image)
                    .width(24)
                    .height(24)
                    .blur(10)
                    .url()}
                width={getImageDimensions(post.image).width}
                height={getImageDimensions(post.image).height}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
                className='object-cover'
            />
            <div className='absolute bottom-0 flex w-full bg-black/50 p-5 text-white backdrop-blur-xl'>
                <div className='flex items-center gap-2'>
                    <Image
                        src={urlFor(post.author.image)
                            .width(32)
                            .height(32)
                            .url()}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className='rounded-full border-2 border-white object-cover'
                    />
                    <div>
                        <Link
                            href={`/blog/author/${post.author.slug.current}`}
                            className='font-bold hover:underline'>
                            {post.author.name}
                        </Link>
                        <div className='text-xs font-bold'>
                            {new Date(post.publishedAt).toLocaleDateString(
                                'en-US',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }
                            )}
                        </div>
                    </div>
                </div>
                <div className='ml-auto'>
                    <Link
                        className='flex items-center justify-center rounded-lg bg-brand-600 px-2 py-0.5 text-xs font-bold text-white duration-200 hover:scale-105 hover:bg-amber-600'
                        href={`/blog/category/${post.category.slug.current}`}>
                        {post.category.title}
                    </Link>
                </div>
            </div>
        </div>

        <div className='prose prose-base prose-li:marker:text-gray-600 prose-hr:mx-auto prose-hr:max-w-[48ch] prose-hr:border-gray-600 lg:prose-lg'>
            <h1 className='font-bold leading-snug text-indigo-600'>
                {post.title}
            </h1>

            <PortableText
                value={post.body}
                components={PortableTextComponents}
            />
        </div>
    </ul>
);
