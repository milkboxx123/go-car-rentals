import type { Metadata } from "next";

import { AccountPageHeader } from "@/components/account/account-page-header";
import { MessagesPanel } from "@/components/account/messages-panel";

export const metadata: Metadata = {
  title: "Messages",
  description: "Message the Go Rentals team about your rental.",
};

export default function AccountMessagesPage() {
  return (
    <div>
      <AccountPageHeader
        title="Messages"
        description="Contact the Go team about pickups, changes, reservations, or support."
      />
      <MessagesPanel />
    </div>
  );
}
