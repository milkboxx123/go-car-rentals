export const motion = {
  duration: {
    fast: 120,
    normal: 180,
    modal: 220,
    slow: 300,
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
