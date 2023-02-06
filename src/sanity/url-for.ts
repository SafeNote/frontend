import { client } from '@/sanity/sanity-client';
import ImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = ImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
