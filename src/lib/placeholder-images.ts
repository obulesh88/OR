import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export let PlaceHolderImages: ImagePlaceholder[] = [];

export function initializePlaceholderImages() {
    if (PlaceHolderImages.length === 0) {
        PlaceHolderImages = data.placeholderImages;
    }
}

// This is not a persistent data store. This is just for demo purposes.
// In a real app, you would have a database.
export function addPlaceholderImage(image: ImagePlaceholder) {
    // Avoid duplicates
    if (!PlaceHolderImages.find(p => p.id === image.id)) {
        PlaceHolderImages.push(image);
    }
}
