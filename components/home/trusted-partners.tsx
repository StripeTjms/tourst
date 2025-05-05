"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

const partners = [
  {
    name: "Biman Bangladesh Airlines",
    logo: "https://www.biman-airlines.com/assets/images/logo.png",
  },
  {
    name: "US-Bangla Airlines",
    logo: "https://www.usbair.com.bd/images/logo.png",
  },
  {
    name: "Novoair",
    logo: "https://www.flynovoair.com/images/logo.png",
  },
  {
    name: "Regent Airways",
    logo: "https://www.flyregent.com/images/logo.png",
  },
  {
    name: "ShareTrip",
    logo: "https://sharetrip.net/assets/images/logo.png",
  },
  {
    name: "GoZayaan",
    logo: "https://gozayaan.com/images/logo.svg",
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
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <div className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
