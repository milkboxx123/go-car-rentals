"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { SearchPanel, type SearchPanelValues } from "./search-panel";
import { cn } from "@/lib/utils";

export interface HeroSearchSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  onSearch?: (values: SearchPanelValues) => void;
}

export function HeroSearchSection({
  title = "Rent the exact car you want",
  subtitle = "Skip the counter. Pick up at the airport, get it delivered, or choose from our local fleet.",
  backgroundImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80",
  className,
  onSearch,
}: HeroSearchSectionProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-go-ink text-go-paper", className)}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-go-ink/90 via-go-ink/70 to-go-ink/40" />
      </div>

      <div className="container-marketing relative py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-display-md font-bold tracking-tight sm:text-display-lg">
            {title}
          </h1>
          <p className="mt-4 text-body-lg text-go-paper/80">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <SearchPanel variant="hero" onSearch={onSearch} />
        </motion.div>
      </div>
    </section>
  );
}
