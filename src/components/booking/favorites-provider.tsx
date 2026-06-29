"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface FavoritesContextValue {
  favoriteIds: Set<string>;
  isLoading: boolean;
  isAuthenticated: boolean;
  toggleFavorite: (vehicleId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [favoriteIds, setFavoriteIds] = React.useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const refreshFavorites = React.useCallback(async () => {
    try {
      const meResponse = await fetch("/api/auth/me");
      if (!meResponse.ok) {
        setIsAuthenticated(false);
        setFavoriteIds(new Set());
        return;
      }

      setIsAuthenticated(true);

      const favoritesResponse = await fetch("/api/account/favorites");
      const data = await favoritesResponse.json();

      if (!favoritesResponse.ok) {
        toast.error(data.error ?? "Unable to load favorites");
        return;
      }

      setFavoriteIds(
        new Set(
          (data.favorites as { vehicleId: string }[]).map(
            (favorite) => favorite.vehicleId
          )
        )
      );
    } catch {
      toast.error("Unable to load favorites");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refreshFavorites();
  }, [refreshFavorites]);

  const toggleFavorite = React.useCallback(
    async (vehicleId: string) => {
      if (!isAuthenticated) {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const wasFavorite = favoriteIds.has(vehicleId);
      const nextFavoriteIds = new Set(favoriteIds);

      if (wasFavorite) {
        nextFavoriteIds.delete(vehicleId);
      } else {
        nextFavoriteIds.add(vehicleId);
      }

      setFavoriteIds(nextFavoriteIds);

      try {
        const response = await fetch("/api/account/favorites", {
          method: wasFavorite ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vehicleId }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to update favorite");
        }

        router.refresh();
      } catch (error) {
        setFavoriteIds(favoriteIds);
        toast.error(
          error instanceof Error ? error.message : "Unable to update favorite"
        );
      }
    },
    [favoriteIds, isAuthenticated, pathname, router]
  );

  const value = React.useMemo(
    () => ({
      favoriteIds,
      isLoading,
      isAuthenticated,
      toggleFavorite,
      refreshFavorites,
    }),
    [favoriteIds, isLoading, isAuthenticated, toggleFavorite, refreshFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
