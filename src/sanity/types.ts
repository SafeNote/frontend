import { PortableTextBlock } from 'sanity';

export type Post = {
    _id: string;
    author: Author;
    body: PortableTextBlock[];
    category: Category;
    excerpt: null | string;
    image: Image;
    publishedAt: string;
    slug: Slug;
    tags: Tag[];
    title: string;
};

export type Author = {
    _id: string;
    image: Image;
    name: string;
    slug: Slug;
};

export type Image = {
    _type: string;
    asset: Asset;
};

export type Asset = {
    _ref: string;
    _type: string;
};

export type Slug = {
    _type: string;
    current: string;
};

export type Category = {
    _id: string;
    description: null | string;
    slug: Slug;
    title: string;
};

export type Tag = {
    _id: string;
    description: null | string;
    slug: Slug;
    title: string;
};
