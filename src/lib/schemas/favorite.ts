import { z } from "zod";

export const favoriteVehicleSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle ID is required"),
});

export type FavoriteVehicleInput = z.infer<typeof favoriteVehicleSchema>;
