"use client";

import { VehicleFavoriteButton } from "@/components/booking/vehicle-favorite-button";
import { VehicleImageGallery } from "@/components/booking/vehicle-image-gallery";
import type { VehicleImage } from "@/types";

export interface VehicleDetailHeroProps {
  vehicleId: string;
  images: VehicleImage[];
}

export function VehicleDetailHero({ vehicleId, images }: VehicleDetailHeroProps) {
  return (
    <div className="relative">
      <VehicleImageGallery images={images} />
      <VehicleFavoriteButton
        vehicleId={vehicleId}
        className="absolute right-3 top-3 z-10"
      />
    </div>
  );
}
