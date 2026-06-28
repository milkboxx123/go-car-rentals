"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types";

export interface VehicleImageGalleryProps {
  images: VehicleImage[];
  className?: string;
}

export function VehicleImageGallery({
  images,
  className,
}: VehicleImageGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = images[activeIndex] ?? images[0];

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  if (!active) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-go-muted-light">
        <Image
          src={active.url}
          alt={active.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        {images.length > 1 && (
          <>
            <IconButton
              type="button"
              variant="favorite"
              size="sm"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => goTo(activeIndex - 1)}
            >
              <ChevronLeft aria-hidden="true" />
            </IconButton>
            <IconButton
              type="button"
              variant="favorite"
              size="sm"
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => goTo(activeIndex + 1)}
            >
              <ChevronRight aria-hidden="true" />
            </IconButton>
            <span className="absolute bottom-3 right-3 rounded-pill bg-go-ink/70 px-2.5 py-1 text-caption text-go-paper">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                index === activeIndex
                  ? "border-go-gold"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
