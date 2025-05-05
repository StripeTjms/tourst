"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getInitialDirection = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40 }
      case "down":
        return { opacity: 0, y: -40 }
      case "left":
        return { opacity: 0, x: 40 }
      case "right":
        return { opacity: 0, x: -40 }
      default:
        return { opacity: 0, y: 40 }
    }
  }

  const getFinalDirection = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0 }
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
        return { opacity: 1, x: 0 }
      case "right":
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <div ref={ref}>
      <motion.div
        initial={getInitialDirection()}
        animate={isInView ? getFinalDirection() : getInitialDirection()}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
