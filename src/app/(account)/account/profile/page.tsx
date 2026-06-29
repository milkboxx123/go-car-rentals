import type { Metadata } from "next";

import { redirect } from "next/navigation";



import { AccountPageHeader } from "@/components/account/account-page-header";

import { AccountSecurityCard } from "@/components/account/account-security-card";

import { DriverDetailsCard } from "@/components/account/driver-details-card";

import { ProfileForm } from "@/components/account/profile-form";

import { ProfileSummaryCard } from "@/components/account/profile-summary-card";

import { RentalPreferencesCard } from "@/components/account/rental-preferences-card";

import { getCurrentUser } from "@/lib/auth-server";
import { getUserInitials } from "@/lib/auth";

import { prisma } from "@/lib/prisma";



export const metadata: Metadata = {

  title: "Profile",

  description: "Manage your Go Car Rentals profile.",

};



export default async function AccountProfilePage() {

  const user = await getCurrentUser();

  if (!user) redirect("/login");



  const dbUser = await prisma.user.findUnique({

    where: { id: user.id },

    select: {

      email: true,

      firstName: true,

      lastName: true,

      phone: true,

      emailVerified: true,

    },

  });



  if (!dbUser) redirect("/login");



  return (

    <div className="max-w-3xl space-y-6">

      <AccountPageHeader

        title="Profile"

        description="Manage your personal information, contact details, and rental preferences."

      />

      <ProfileSummaryCard

        firstName={dbUser.firstName}

        lastName={dbUser.lastName}

        email={dbUser.email}

        emailVerified={dbUser.emailVerified}

        initials={getUserInitials(user)}

      />

      <ProfileForm initialData={dbUser} />

      <DriverDetailsCard />

      <RentalPreferencesCard />

      <AccountSecurityCard />

    </div>

  );

}

