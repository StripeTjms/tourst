"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        })
        setEmail("")
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <section className="py-20 bg-primary/5">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-xl p-8 md:p-10 border border-border text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>

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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Subscribing..."
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
