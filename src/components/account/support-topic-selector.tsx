"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const SUPPORT_TOPICS = [
  { value: "booking", label: "Booking question" },
  { value: "pickup", label: "Pickup or delivery" },
  { value: "change", label: "Change or extend a trip" },
  { value: "payment", label: "Payment question" },
  { value: "vehicle", label: "Vehicle issue" },
  { value: "lost-item", label: "Lost item" },
  { value: "general", label: "General support" },
] as const;

export type SupportTopic = (typeof SUPPORT_TOPICS)[number]["value"];

export interface SupportTopicSelectorProps {
  value: SupportTopic | "";
  onChange: (value: SupportTopic) => void;
  id?: string;
}

export function SupportTopicSelector({
  value,
  onChange,
  id = "support-topic",
}: SupportTopicSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>What do you need help with?</Label>
      <Select
        value={value || undefined}
        onValueChange={(next) => onChange(next as SupportTopic)}
      >
        <SelectTrigger id={id} aria-label="Support topic">
          <SelectValue placeholder="Select a topic" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORT_TOPICS.map((topic) => (
            <SelectItem key={topic.value} value={topic.value}>
              {topic.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
