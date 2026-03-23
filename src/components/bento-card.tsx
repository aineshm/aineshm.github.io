"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  colSpan?: 1 | 2;
}

export function BentoCard({
  children,
  variant = "light",
  className = "",
  colSpan = 1,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-2xl p-5 ${
        colSpan === 2 ? "col-span-2" : ""
      } ${
        variant === "dark"
          ? "bg-accent-dark text-white"
          : "border border-border bg-card"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
