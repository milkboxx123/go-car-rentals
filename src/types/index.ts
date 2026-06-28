export type VehicleType =
  | "car"
  | "suv"
  | "truck"
  | "minivan"
  | "luxury"
  | "convertible"
  | "electric"
  | "van";

export type PickupMethod =
  | "lot"
  | "airport"
  | "delivery"
  | "hotel"
  | "custom-address";

export type ReservationStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled"
  | "refunded"
  | "no-show"
  | "needs-review";

export type VehicleStatus =
  | "available"
  | "booked"
  | "maintenance"
  | "cleaning"
  | "unavailable"
  | "coming-soon"
  | "retired";

export type FuelType =
  | "gasoline"
  | "diesel"
  | "electric"
  | "hybrid"
  | "plug-in-hybrid";

export type Transmission = "automatic" | "manual";

export type Drivetrain = "fwd" | "rwd" | "awd" | "4wd";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export type VehicleBadgeType =
  | "new"
  | "verified"
  | "airport"
  | "delivery"
  | "monthly"
  | "luxury"
  | "electric"
  | "discount";

export interface VehicleBadge {
  type: VehicleBadgeType;
  label: string;
}

export interface VehicleImage {
  url: string;
  alt: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  region: string;
  timezone: string;
  airport: {
    code: string;
    name: string;
  };
  deliveryAvailable: boolean;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  type: VehicleType;
  seats: number;
  doors: number;
  fuelType: FuelType;
  transmission: Transmission;
  drivetrain: Drivetrain;
  mpg?: number;
  electricRange?: number;
  rating: number;
  reviewCount: number;
  locationId: string;
  location: string;
  airportAvailable: boolean;
  deliveryAvailable: boolean;
  dailyRate: number;
  tripTotal?: number;
  images: VehicleImage[];
  badges: VehicleBadge[];
  features: string[];
  mileageAllowance: number;
  status: VehicleStatus;
  description: string;
  vin?: string;
  plate?: string;
}

export interface ReservationGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Reservation {
  id: string;
  confirmationNumber: string;
  vehicleId: string;
  locationId: string;
  status: ReservationStatus;
  pickupMethod: PickupMethod;
  pickupLocation: string;
  dropoffLocation?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  dailyRate: number;
  totalDays: number;
  subtotal: number;
  deliveryFee?: number;
  taxes: number;
  discount?: number;
  total: number;
  guest: ReservationGuest;
  createdAt: string;
  paymentStatus: PaymentStatus;
}

export interface ReviewAuthor {
  name: string;
  initials: string;
  avatarUrl?: string;
}

export interface Review {
  id: string;
  vehicleId: string;
  locationId: string;
  author: ReviewAuthor;
  rating: number;
  title?: string;
  content: string;
  date: string;
  tripType?: "business" | "leisure" | "family" | "airport";
  verified: boolean;
}
