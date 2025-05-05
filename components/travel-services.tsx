"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PlaneTakeoff, Building2, Package, Stamp, CreditCard, Users, Headphones, Shield } from "lucide-react"

const services = [
  {
    icon: <PlaneTakeoff className="h-10 w-10 text-primary" />,
    title: "Flight Booking",
    description: "Compare and book flights from multiple airlines at the best prices",
  },
  {
    icon: <Building2 className="h-10 w-10 text-primary" />,
    title: "Hotel Reservations",
    description: "Find the perfect accommodation from budget to luxury hotels worldwide",
  },
  {
    icon: <Package className="h-10 w-10 text-primary" />,
    title: "Tour Packages",
    description: "Discover comprehensive tour packages from top travel agencies",
  },
  {
    icon: <Stamp className="h-10 w-10 text-primary" />,
    title: "Visa Services",
    description: "Hassle-free visa application process for your international travel",
  },
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
]

export function TravelServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of travel services to make your journey seamless and enjoyable. From booking
            flights to arranging visas, we've got you covered.
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
