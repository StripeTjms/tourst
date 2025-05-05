"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

const partners = [
  {
    id: 1,
    name: "Airline Partner",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Hotel Chain",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "Travel Insurance",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    name: "Credit Card",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 5,
    name: "Tourism Board",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 6,
    name: "Car Rental",
    logo: "/placeholder.svg?height=100&width=200",
  },
]

export function TrustedPartners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Our Trusted Partners</h2>
          <p className="text-muted-foreground">
            We collaborate with leading brands in the travel industry to bring you the best services
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <div className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
