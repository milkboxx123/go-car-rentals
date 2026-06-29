import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountPageHeader } from "@/components/account/account-page-header";
import { FavoritesList } from "@/components/account/favorites-list";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getVehicleById } from "@/mock";

export const metadata: Metadata = {
  title: "Favorites",
  description: "View and manage your saved vehicles.",
};

export default async function AccountFavoritesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const vehicles = favorites
    .map((favorite) => getVehicleById(favorite.vehicleId))
    .filter((vehicle): vehicle is NonNullable<typeof vehicle> => Boolean(vehicle));

  return (
    <div className="max-w-4xl">
      <AccountPageHeader
        title="Favorites"
        description="Vehicles you've saved for later."
      />
      <FavoritesList vehicles={vehicles} />
    </div>
  );
}
