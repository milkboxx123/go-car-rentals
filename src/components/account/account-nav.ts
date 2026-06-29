import {
  CalendarDays,
  CreditCard,
  Heart,
  MessageSquare,
  User,
  type LucideIcon,
} from "lucide-react";

export interface AccountNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const ACCOUNT_NAV_ITEMS: AccountNavItem[] = [
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/trips", label: "Trips", icon: CalendarDays },
  { href: "/account/favorites", label: "Favorites", icon: Heart },
  { href: "/account/payment", label: "Payment", icon: CreditCard },
  { href: "/account/messages", label: "Messages", icon: MessageSquare },
];

export function isAccountNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
