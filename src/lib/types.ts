import type { ImagePlaceholder } from './placeholder-images';

export interface App {
  id: string;
  slug: string;
  title: string;
  iconUrl: ImagePlaceholder['id'];
  version: string;
  description: string;
  screenshots: ImagePlaceholder['id'][];
  categoryId: string;
  downloadCount: number;
}

export interface Category {
  id: string;
  name: string;
}
