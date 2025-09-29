import type { ImagePlaceholder } from './placeholder-images';

export interface App {
  id: string;
  slug: string;
  title: string;
  iconUrl: ImagePlaceholder['id'];
  version: string;
  description: string;
  screenshots: ImagePlaceholder['id'][];
  downloadCount: number;
}
