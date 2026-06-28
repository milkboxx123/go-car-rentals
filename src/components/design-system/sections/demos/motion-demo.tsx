"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { motion } from "@/design-system/tokens/motion";

export function MotionDemo() {
  const [active, setActive] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="secondary"
        onClick={() => setActive((prev) => !prev)}
      >
        Toggle motion
      </Button>
      <div
        className="flex size-16 items-center justify-center rounded-lg bg-go-gold text-label font-semibold text-go-ink"
        style={{
          transform: active ? "translateX(8rem) scale(1.1)" : "translateX(0) scale(1)",
          transitionProperty: "transform",
          transitionDuration: `${motion.duration.normal}ms`,
          transitionTimingFunction: motion.easing.default,
        }}
      >
        Go
      </div>
      <p className="text-caption text-go-muted">
        {motion.duration.normal}ms · {motion.easing.default}
      </p>
    </div>
  );
}
