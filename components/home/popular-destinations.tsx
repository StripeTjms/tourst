"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "/placeholder.svg?height=600&width=800",
    properties: 1245,
    featured: true,
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image: "/placeholder.svg?height=600&width=800",
    properties: 867,
    featured: true,
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    image: "/placeholder.svg?height=600&width=800",
    properties: 2130,
    featured: false,
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    image: "/placeholder.svg?height=600&width=800",
    properties: 1876,
    featured: true,
  },
  {
    id: 5,
    name: "New York",
    country: "USA",
    image: "/placeholder.svg?height=600&width=800",
    properties: 3241,
    featured: false,
  },
  {
    id: 6,
    name: "Dubai",
    country: "UAE",
    image: "/placeholder.svg?height=600&width=800",
    properties: 1543,
    featured: true,
  },
  {
    id: 7,
    name: "Maldives",
    country: "Maldives",
    image: "/placeholder.svg?height=600&width=800",
    properties: 432,
    featured: true,
  },
  {
    id: 8,
    name: "Barcelona",
    country: "Spain",
    image: "/placeholder.svg?height=600&width=800",
    properties: 1287,
    featured: false,
  },
]

export function PopularDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular destinations around the world. Explore breathtaking landscapes, vibrant cities,
            and cultural wonders.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/destinations/${destination.id}`} className="block">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="aspect-[4/3]">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 text-sm">{destination.country}</span>
                      <span className="text-white/90 text-sm">{destination.properties} properties</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/destinations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
