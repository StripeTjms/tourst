"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxScrollProps {
  children: ReactNode
  baseVelocity?: number
  direction?: "up" | "down"
}

export function ParallaxScroll({ children, baseVelocity = 100, direction = "up" }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, direction === "up" ? -baseVelocity : baseVelocity])

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
