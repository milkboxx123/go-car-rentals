"use client";

import * as React from "react";

import { StatusPill } from "@/components/go/forms/status-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { locations, VEHICLE_TYPE_OPTIONS } from "@/mock";
import type { Vehicle, VehicleStatus } from "@/types";

const VEHICLE_STATUSES: VehicleStatus[] = [
  "available",
  "booked",
  "maintenance",
  "cleaning",
  "unavailable",
  "coming-soon",
  "retired",
];

export interface AdminVehicleFormValues {
  year: number;
  make: string;
  model: string;
  trim: string;
  type: Vehicle["type"];
  seats: number;
  doors: number;
  fuelType: Vehicle["fuelType"];
  transmission: Vehicle["transmission"];
  drivetrain: Vehicle["drivetrain"];
  dailyRate: number;
  mileageAllowance: number;
  locationId: string;
  airportAvailable: boolean;
  deliveryAvailable: boolean;
  status: VehicleStatus;
  description: string;
  vin: string;
  plate: string;
}

export interface AdminVehicleFormProps {
  initialValues?: Partial<AdminVehicleFormValues>;
  onSubmit?: (values: AdminVehicleFormValues) => void;
  onCancel?: () => void;
  className?: string;
}

const defaultValues: AdminVehicleFormValues = {
  year: new Date().getFullYear(),
  make: "",
  model: "",
  trim: "",
  type: "suv",
  seats: 5,
  doors: 4,
  fuelType: "gasoline",
  transmission: "automatic",
  drivetrain: "fwd",
  dailyRate: 75,
  mileageAllowance: 200,
  locationId: locations[0]?.id ?? "",
  airportAvailable: true,
  deliveryAvailable: false,
  status: "available",
  description: "",
  vin: "",
  plate: "",
};

export function AdminVehicleForm({
  initialValues,
  onSubmit,
  onCancel,
  className,
}: AdminVehicleFormProps) {
  const [values, setValues] = React.useState<AdminVehicleFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  function updateField<K extends keyof AdminVehicleFormValues>(
    key: K,
    value: AdminVehicleFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit?.(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-lg border border-go-border bg-go-paper shadow-xs",
        className
      )}
    >
      <div className="border-b border-go-border px-6 py-4">
        <h2 className="text-heading-sm font-bold text-go-ink">Vehicle details</h2>
        <p className="mt-1 text-body-sm text-go-muted">
          Add or update fleet vehicle information.
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="year" required>
            Year
          </Label>
          <Input
            id="year"
            type="number"
            min={1990}
            max={2030}
            value={values.year}
            onChange={(e) => updateField("year", Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="make" required>
            Make
          </Label>
          <Input
            id="make"
            value={values.make}
            onChange={(e) => updateField("make", e.target.value)}
            placeholder="Toyota"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model" required>
            Model
          </Label>
          <Input
            id="model"
            value={values.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="RAV4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="trim">Trim</Label>
          <Input
            id="trim"
            value={values.trim}
            onChange={(e) => updateField("trim", e.target.value)}
            placeholder="XLE"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" required>
            Type
          </Label>
          <Select
            value={values.type}
            onValueChange={(value) =>
              updateField("type", value as Vehicle["type"])
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" required>
            Status
          </Label>
          <Select
            value={values.status}
            onValueChange={(value) =>
              updateField("status", value as VehicleStatus)
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  <span className="flex items-center gap-2">
                    <StatusPill status={status} />
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" required>
            Location
          </Label>
          <Select
            value={values.locationId}
            onValueChange={(value) => updateField("locationId", value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name} — {location.city}, {location.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dailyRate" required>
            Daily rate
          </Label>
          <Input
            id="dailyRate"
            type="number"
            min={0}
            step={1}
            value={values.dailyRate}
            onChange={(e) => updateField("dailyRate", Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seats" required>
            Seats
          </Label>
          <Input
            id="seats"
            type="number"
            min={2}
            max={12}
            value={values.seats}
            onChange={(e) => updateField("seats", Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doors" required>
            Doors
          </Label>
          <Input
            id="doors"
            type="number"
            min={2}
            max={6}
            value={values.doors}
            onChange={(e) => updateField("doors", Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuelType" required>
            Fuel type
          </Label>
          <Select
            value={values.fuelType}
            onValueChange={(value) =>
              updateField("fuelType", value as Vehicle["fuelType"])
            }
          >
            <SelectTrigger id="fuelType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="plug-in-hybrid">Plug-in hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission" required>
            Transmission
          </Label>
          <Select
            value={values.transmission}
            onValueChange={(value) =>
              updateField("transmission", value as Vehicle["transmission"])
            }
          >
            <SelectTrigger id="transmission">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="drivetrain" required>
            Drivetrain
          </Label>
          <Select
            value={values.drivetrain}
            onValueChange={(value) =>
              updateField("drivetrain", value as Vehicle["drivetrain"])
            }
          >
            <SelectTrigger id="drivetrain">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fwd">FWD</SelectItem>
              <SelectItem value="rwd">RWD</SelectItem>
              <SelectItem value="awd">AWD</SelectItem>
              <SelectItem value="4wd">4WD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mileageAllowance" required>
            Mileage allowance
          </Label>
          <Input
            id="mileageAllowance"
            type="number"
            min={0}
            step={25}
            value={values.mileageAllowance}
            onChange={(e) =>
              updateField("mileageAllowance", Number(e.target.value))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vin">VIN</Label>
          <Input
            id="vin"
            value={values.vin}
            onChange={(e) => updateField("vin", e.target.value)}
            placeholder="1HGBH41JXMN109186"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plate">License plate</Label>
          <Input
            id="plate"
            value={values.plate}
            onChange={(e) => updateField("plate", e.target.value)}
            placeholder="GO-TPA-01"
          />
        </div>

        <div className="flex items-center justify-between rounded-md border border-go-border bg-go-muted-light/40 px-4 py-3 md:col-span-2">
          <div>
            <Label htmlFor="airportAvailable">Airport pickup</Label>
            <p className="text-caption text-go-muted">
              Available for airport curbside pickup
            </p>
          </div>
          <Switch
            id="airportAvailable"
            checked={values.airportAvailable}
            onCheckedChange={(checked) =>
              updateField("airportAvailable", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between rounded-md border border-go-border bg-go-muted-light/40 px-4 py-3 md:col-span-2">
          <div>
            <Label htmlFor="deliveryAvailable">Delivery</Label>
            <p className="text-caption text-go-muted">
              Offer delivery to guest address
            </p>
          </div>
          <Switch
            id="deliveryAvailable"
            checked={values.deliveryAvailable}
            onCheckedChange={(checked) =>
              updateField("deliveryAvailable", checked)
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description" required>
            Description
          </Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Brief description for the listing..."
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-go-border bg-go-muted-light/30 px-6 py-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          Save vehicle
        </Button>
      </div>
    </form>
  );
}
