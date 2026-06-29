import type { Metadata } from "next";

import { redirect } from "next/navigation";



import { AccountPageHeader } from "@/components/account/account-page-header";

import { TripCard } from "@/components/account/trip-card";

import { TripsEmptyState } from "@/components/account/trips-empty-state";

import { Badge } from "@/components/ui/badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getCurrentUser } from "@/lib/auth-server";

import { prisma } from "@/lib/prisma";

import type { Reservation as DbReservation } from "@prisma/client";



export const metadata: Metadata = {

  title: "My Trips",

  description: "View upcoming, active, and past car rental reservations.",

};



const UPCOMING_STATUSES: DbReservation["status"][] = ["PENDING", "CONFIRMED"];

const ACTIVE_STATUSES: DbReservation["status"][] = ["ACTIVE"];

const PAST_STATUSES: DbReservation["status"][] = ["COMPLETED", "CANCELLED"];



function filterTrips(trips: DbReservation[], statuses: DbReservation["status"][]) {

  return trips.filter((trip) => statuses.includes(trip.status));

}



function TripList({ items }: { items: DbReservation[] }) {

  if (items.length === 0) {

    return <TripsEmptyState />;

  }



  return (

    <div className="space-y-4">

      {items.map((reservation) => (

        <TripCard key={reservation.id} reservation={reservation} />

      ))}

    </div>

  );

}



export default async function AccountTripsPage() {

  const user = await getCurrentUser();

  if (!user) redirect("/login");



  const trips = await prisma.reservation.findMany({

    where: { userId: user.id },

    orderBy: { startDate: "desc" },

  });



  const upcoming = filterTrips(trips, UPCOMING_STATUSES);

  const active = filterTrips(trips, ACTIVE_STATUSES);

  const past = filterTrips(trips, PAST_STATUSES);



  return (

    <div className="max-w-4xl">

      <AccountPageHeader

        title="My trips"

        description="Manage upcoming reservations, active rentals, and past trips."

      />



      <Tabs defaultValue="upcoming">

        <TabsList variant="pill" className="mb-6 w-full justify-start overflow-x-auto">

          <TabsTrigger value="upcoming" variant="pill">

            Upcoming <Badge className="ml-2">{upcoming.length}</Badge>

          </TabsTrigger>

          <TabsTrigger value="active" variant="pill">

            Active <Badge className="ml-2">{active.length}</Badge>

          </TabsTrigger>

          <TabsTrigger value="past" variant="pill">

            Past <Badge className="ml-2">{past.length}</Badge>

          </TabsTrigger>

        </TabsList>



        <TabsContent value="upcoming">

          <TripList items={upcoming} />

        </TabsContent>

        <TabsContent value="active">

          <TripList items={active} />

        </TabsContent>

        <TabsContent value="past">

          <TripList items={past} />

        </TabsContent>

      </Tabs>

    </div>

  );

}

