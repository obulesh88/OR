'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface ScreenshotCarouselProps {
  screenshots: ImagePlaceholder[];
}

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {screenshots.map((screenshot, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="flex aspect-[9/16] items-center justify-center p-0">
                  <Image
                    src={screenshot.imageUrl}
                    alt={screenshot.description}
                    width={1080}
                    height={1920}
                    data-ai-hint={screenshot.imageHint}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
