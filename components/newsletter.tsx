"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your API
      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-primary/5">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Travel Deals</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals, new destinations, and travel
            tips from around the world.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitted}>
              {isSubmitted ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive travel-related emails.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
