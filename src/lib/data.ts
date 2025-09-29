import type { App } from './types';
import { PlaceHolderImages, addPlaceholderImage } from './placeholder-images';

const APPS: App[] = [
  {
    id: '1',
    slug: 'social-connect',
    title: 'Social Connect',
    iconUrl: 'icon-social-connect',
    version: '2.5.1',
    description: 'Connect with friends and family, share updates, and discover new communities. Social Connect makes it easy to stay in touch and up-to-date with what matters most to you.',
    screenshots: ['ss-social-1', 'ss-social-2'],
    downloadCount: 152034,
  },
  {
    id: '2',
    slug: 'pixel-pilot',
    title: 'Pixel Pilot',
    iconUrl: 'icon-pixel-pilot',
    version: '1.8.0',
    description: 'Take to the skies in this thrilling retro arcade shooter. Battle waves of enemies, collect power-ups, and defeat epic bosses. Are you ready to become a Pixel Pilot?',
    screenshots: ['ss-pixel-1', 'ss-pixel-2'],
    downloadCount: 89345,
  },
  {
    id: '3',
    slug: 'finance-tracker',
    title: 'Finance Tracker',
    iconUrl: 'icon-finance-tracker',
    version: '3.1.2',
    description: 'Take control of your finances with Finance Tracker. Monitor your spending, create budgets, and visualize your financial habits with intuitive charts and reports.',
    screenshots: ['ss-finance-1', 'ss-finance-2'],
    downloadCount: 210987,
  },
  {
    id: '4',
    slug: 'photo-editor-pro',
    title: 'Photo Editor Pro',
    iconUrl: 'icon-photo-editor',
    version: '4.2.5',
    description: 'Unleash your creativity with Photo Editor Pro. A full suite of professional editing tools, filters, and effects to make your photos stand out.',
    screenshots: ['ss-photo-1', 'ss-photo-2'],
    downloadCount: 175632,
  },
  {
    id: '5',
    slug: 'code-hub',
    title: 'Code Hub',
    iconUrl: 'icon-code-hub',
    version: '1.2.0',
    description: 'The ultimate mobile code editor and repository manager. Write, edit, and commit code on the go. Supports multiple languages and integrates with your favorite Git providers.',
    screenshots: ['ss-code-1'],
    downloadCount: 45012,
  },
  {
    id: '6',
    slug: 'gourmet-go',
    title: 'Gourmet Go',
    iconUrl: 'icon-gourmet-go',
    version: '2.0.0',
    description: 'Discover and save delicious recipes from around the world. With step-by-step instructions and video guides, cooking has never been easier. Find your next favorite meal with Gourmet Go.',
    screenshots: ['ss-gourmet-1'],
    downloadCount: 98456,
  },
];

export function getApps(): App[] {
  return APPS;
}

export function getAppBySlug(slug: string): App | undefined {
  return APPS.find((app) => app.slug === slug);
}

export function findImage(id: string) {
    return PlaceHolderImages.find(img => img.id === id);
}

export function addApp(appData: { title: string; version: string; description: string }): App {
    const slug = appData.title.toLowerCase().replace(/\s+/g, '-');
    const newId = (APPS.length + 1).toString();

    const newIconId = `icon-new-app-${newId}`;
    addPlaceholderImage({
        id: newIconId,
        description: `Icon for ${appData.title}`,
        imageUrl: `https://picsum.photos/seed/${newId}/128/128`,
        imageHint: "logo abstract"
    });

    const newScreenshotId = `ss-new-app-${newId}`;
    addPlaceholderImage({
        id: newScreenshotId,
        description: `Screenshot for ${appData.title}`,
        imageUrl: `https://picsum.photos/seed/ss${newId}/1080/1920`,
        imageHint: "app interface"
    });


    const newApp: App = {
        id: newId,
        slug,
        title: appData.title,
        version: appData.version,
        description: appData.description,
        iconUrl: newIconId,
        screenshots: [newScreenshotId],
        downloadCount: 0,
    };

    APPS.unshift(newApp); // Add to the beginning of the list
    return newApp;
}
