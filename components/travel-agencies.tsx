"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agencies = [
  {
    id: 1,
    name: "TravelMasters",
    logo: "/placeholder.svg?height=200&width=200",
    cover: "/placeholder.svg?height=400&width=800",
    location: "New York, USA",
    rating: 4.8,
    reviews: 324,
    packages: 45,
    featured: true,
    verified: true,
  },
  {
    id: 2,
    name: "AsiaEscapes",
    logo: "/placeholder.svg?height=200&width=200",
    cover: "/placeholder.svg?height=400&width=800",
    location: "Bangkok, Thailand",
    rating: 4.9,
    reviews: 412,
    packages: 78,
    featured: true,
    verified: true,
  },
  {
    id: 3,
    name: "EuroVentures",
    logo: "/placeholder.svg?height=200&width=200",
    cover: "/placeholder.svg?height=400&width=800",
    location: "Paris, France",
    rating: 4.7,
    reviews: 287,
    packages: 62,
    featured: false,
    verified: true,
  },
  {
    id: 4,
    name: "OceaniaExplorers",
    logo: "/placeholder.svg?height=200&width=200",
    cover: "/placeholder.svg?height=400&width=800",
    location: "Sydney, Australia",
    rating: 4.6,
    reviews: 198,
    packages: 34,
    featured: false,
    verified: true,
  },
]

export function TravelAgencies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Top Travel Agencies</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover trusted travel agencies from around the world offering exclusive packages and services. Compare
              offerings and find the perfect partner for your next adventure.
            </p>
          </div>
          <Button variant="link" asChild className="mt-4 md:mt-0 p-0">
            <Link href="/agencies" className="flex items-center gap-2">
              View All Agencies <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agencies.map((agency, index) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <div className="h-32">
                  <Image
                    src={agency.cover || "/placeholder.svg"}
                    alt={`${agency.name} cover`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 left-4 border-4 border-background rounded-full bg-white p-1">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={agency.logo || "/placeholder.svg"} alt={agency.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {agency.featured && (
                    <Badge variant="default" className="text-xs font-semibold">
                      Featured
                    </Badge>
                  )}
                  {agency.verified && (
                    <Badge variant="secondary" className="text-xs font-semibold">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6 pt-12">
                <h3 className="text-xl font-bold mb-2">{agency.name}</h3>

                <div className="flex items-center gap-1 text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{agency.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{agency.rating}</span>
                    <span className="text-muted-foreground text-sm">({agency.reviews})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{agency.packages} packages</div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/agencies/${agency.id}`}>View Agency</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
