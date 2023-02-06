/* eslint-disable no-underscore-dangle */
import { Post } from '@/sanity/types';
import { urlFor } from '@/sanity/url-for';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import Link from 'next/link';

const List = ({ posts }: { posts: Post[] }) => (
    <ul className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3'>
        {posts.map(post => (
            <li key={post._id} className='group p-2'>
                <Link
                    href={`/blog/${post.slug.current}`}
                    className='flex flex-col gap-2'>
                    <div className='relative h-64 w-full overflow-hidden rounded-lg duration-200 ease-out group-hover:scale-[.98]'>
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
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
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

                    <div className='flex-auto space-y-3'>
                        <h2 className='text-xl font-bold leading-relaxed text-indigo-600 group-hover:underline'>
                            {post.title}
                        </h2>

                        <p className='leading-relaxed text-gray-700 line-clamp-2'>
                            {post.excerpt}
                        </p>
                    </div>

                    <ul className='flex items-center gap-2 text-sm'>
                        {post.tags.map(tag => (
                            <li key={tag._id}>
                                <Link
                                    href={`/blog/tag/${tag.slug.current}`}
                                    className='tracking-wider hover:underline'>
                                    #{tag.title.replace(/\s+/g, '')}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Link>
            </li>
        ))}
    </ul>
);

export default List;
