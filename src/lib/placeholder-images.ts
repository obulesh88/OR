import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

// This is not a persistent data store. This is just for demo purposes.
// In a real app, you would have a database.
export function addPlaceholderImage(image: ImagePlaceholder) {
    PlaceHolderImages.push(image);
}
