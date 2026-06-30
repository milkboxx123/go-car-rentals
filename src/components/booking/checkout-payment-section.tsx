"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const stripePromiseCache: Record<string, Promise<Stripe | null>> = {};

function getStripePromise(publishableKey: string) {
  if (!stripePromiseCache[publishableKey]) {
    stripePromiseCache[publishableKey] = loadStripe(publishableKey);
  }
  return stripePromiseCache[publishableKey];
}

function PaymentConfirmForm({
  confirmationNumber,
}: {
  confirmationNumber: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/account/trips`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message ?? "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        toast.success("Reservation confirmed!");
        router.push(`/account/trips?confirmed=${confirmationNumber}`);
        return;
      }

      toast.message("Payment processing — we'll confirm your booking shortly.");
      router.push("/account/trips");
    } catch {
      toast.error("Unable to complete payment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Processing..." : "Pay and confirm reservation"}
      </Button>
      <p className="text-body-xs text-go-muted">Reservation #{confirmationNumber}</p>
    </form>
  );
}

export function CheckoutPaymentSection({
  locationId,
  locationSlug,
  vehicleId,
  bookingGroupId,
  startDate,
  endDate,
  pickupLocation,
  protectionPlan,
  onBack,
}: {
  locationId: string;
  locationSlug: string;
  vehicleId: string;
  bookingGroupId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  protectionPlan: "basic" | "standard" | "premium";
  onBack: () => void;
}) {
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [confirmationNumber, setConfirmationNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);

      try {
        const configRes = await fetch(`/api/locations/${locationSlug}/stripe-config`);
        const configData = await configRes.json();
        if (!configRes.ok) {
          throw new Error(configData.error ?? "Payments unavailable for this location");
        }

        if (cancelled) return;
        setPublishableKey(configData.publishableKey);

        const reservationRes = await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleId,
            bookingGroupId,
            locationId,
            startDate,
            endDate,
            pickupLocation,
            protectionPlan,
          }),
        });
        const reservationData = await reservationRes.json();
        if (!reservationRes.ok) {
          throw new Error(reservationData.error ?? "Unable to create reservation");
        }

        if (cancelled) return;
        setReservationId(reservationData.reservation.id);
        setConfirmationNumber(reservationData.reservation.confirmationNumber);

        const piRes = await fetch("/api/reservations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservationId: reservationData.reservation.id,
            locationId,
          }),
        });
        const piData = await piRes.json();
        if (!piRes.ok) {
          throw new Error(piData.error ?? "Unable to initialize payment");
        }

        if (cancelled) return;
        setClientSecret(piData.clientSecret);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to start checkout");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [
    locationId,
    locationSlug,
    vehicleId,
    bookingGroupId,
    startDate,
    endDate,
    pickupLocation,
    protectionPlan,
  ]);

  const stripePromise = useMemo(
    () => (publishableKey ? getStripePromise(publishableKey) : null),
    [publishableKey]
  );

  if (loading) {
    return <p className="text-body-sm text-go-muted">Preparing secure checkout...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-body-sm text-destructive">{error}</p>
        <Button variant="outline" onClick={onBack}>
          Go back
        </Button>
      </div>
    );
  }

  if (!stripePromise || !clientSecret || !reservationId || !confirmationNumber) {
    return <p className="text-body-sm text-go-muted">Unable to load payment form.</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentConfirmForm confirmationNumber={confirmationNumber} />
    </Elements>
  );
}
