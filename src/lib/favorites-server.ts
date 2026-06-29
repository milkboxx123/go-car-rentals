import "server-only";

import { prisma } from "@/lib/prisma";

export async function getFavoriteCount(userId: string): Promise<number> {
  return prisma.favorite.count({ where: { userId } });
}

export async function getFavoriteVehicleIds(userId: string): Promise<string[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { vehicleId: true },
    orderBy: { createdAt: "desc" },
  });

  return favorites.map((favorite) => favorite.vehicleId);
}
