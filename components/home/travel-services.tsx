"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CreditCard, Users, Headphones, Shield, Languages, Wallet, Calendar, Smartphone } from "lucide-react"

const services = [
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: "Secure Payments",
    description: "Multiple payment options with secure transaction processing",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Group Bookings",
    description: "Special discounts and arrangements for group travelers",
  },
  {
    icon: <Headphones className="h-10 w-10 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance for a worry-free journey",
  },
  {
    icon: <Languages className="h-10 w-10 text-primary" />,
    title: "Multi-language Support",
    description: "Support in multiple languages for international travelers",
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: "Best Price Guarantee",
    description: "We match or beat any comparable price you find elsewhere",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Flexible Booking",
    description: "Change or cancel your bookings with minimal or no fees",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App",
    description: "Manage your bookings on the go with our mobile application",
  },
]

export function TravelServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Toureest</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of travel services to make your journey seamless and enjoyable. Here's why
            thousands of travelers choose us for their adventures.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card hover:bg-accent transition-colors duration-300 p-6 rounded-xl border border-border hover:border-primary/20 text-center"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
