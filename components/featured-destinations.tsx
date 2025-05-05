"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=600&width=800",
    description: "Tropical paradise with beautiful beaches and rich culture",
    price: "From $799",
    rating: 4.8,
    reviews: 1245,
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=600&width=800",
    description: "Stunning white buildings and breathtaking sea views",
    price: "From $1,099",
    rating: 4.9,
    reviews: 2130,
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=600&width=800",
    description: "Blend of traditional culture and futuristic technology",
    price: "From $1,299",
    rating: 4.7,
    reviews: 1876,
  },
  {
    id: 4,
    name: "Paris, France",
    image: "/placeholder.svg?height=600&width=800",
    description: "City of love, art, and incredible cuisine",
    price: "From $899",
    rating: 4.6,
    reviews: 3241,
  },
  {
    id: 5,
    name: "New York, USA",
    image: "/placeholder.svg?height=600&width=800",
    description: "The city that never sleeps with iconic landmarks",
    price: "From $999",
    rating: 4.5,
    reviews: 2987,
  },
  {
    id: 6,
    name: "Machu Picchu, Peru",
    image: "/placeholder.svg?height=600&width=800",
    description: "Ancient Incan citadel set against a mountain backdrop",
    price: "From $1,499",
    rating: 4.9,
    reviews: 1543,
  },
]

export function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, destinations.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of the most popular destinations around the world. Explore breathtaking
              landscapes, vibrant cities, and cultural wonders.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div ref={ref} className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                className={cn(
                  "flex-shrink-0",
                  window.innerWidth >= 1024
                    ? "w-[calc(33.333%-1rem)]"
                    : window.innerWidth >= 768
                      ? "w-[calc(50%-0.75rem)]"
                      : "w-full",
                )}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Link href={`/destinations/${destination.id}`} className="block group">
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
                      <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                      <p className="text-white/90 text-sm mb-3">{destination.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">{destination.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white text-sm">
                            {destination.rating} ({destination.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
