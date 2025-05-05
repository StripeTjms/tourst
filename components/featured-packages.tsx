"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const packages = [
  {
    id: 1,
    title: "Bali Adventure Package",
    image: "/placeholder.svg?height=600&width=800",
    location: "Bali, Indonesia",
    duration: "7 Days / 6 Nights",
    groupSize: "Up to 10 people",
    price: 1299,
    rating: 4.8,
    reviews: 124,
    agency: "TravelMasters",
    discount: 15,
    featured: true,
  },
  {
    id: 2,
    title: "European Highlights Tour",
    image: "/placeholder.svg?height=600&width=800",
    location: "Multiple Cities, Europe",
    duration: "14 Days / 13 Nights",
    groupSize: "Up to 15 people",
    price: 2499,
    rating: 4.7,
    reviews: 98,
    agency: "EuroVentures",
    discount: 0,
    featured: false,
  },
  {
    id: 3,
    title: "Thailand Beach Getaway",
    image: "/placeholder.svg?height=600&width=800",
    location: "Phuket & Krabi, Thailand",
    duration: "8 Days / 7 Nights",
    groupSize: "Up to 8 people",
    price: 1099,
    rating: 4.9,
    reviews: 156,
    agency: "AsiaEscapes",
    discount: 10,
    featured: true,
  },
]

export function FeaturedPackages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 relative">
              Featured Tour Packages
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our carefully curated tour packages from top travel agencies around the world. All-inclusive deals
              with flights, hotels, activities, and more.
            </p>
          </div>
          <Button variant="link" asChild className="mt-4 md:mt-0 p-0 group">
            <Link href="/packages" className="flex items-center gap-2">
              View All Packages <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {pkg.discount > 0 && (
                    <Badge variant="destructive" className="text-xs font-semibold animate-pulse">
                      {pkg.discount}% OFF
                    </Badge>
                  )}
                  {pkg.featured && (
                    <Badge variant="default" className="text-xs font-semibold">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                  By {pkg.agency}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{pkg.title}</h3>

                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{pkg.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{pkg.rating}</span>
                    <span className="text-muted-foreground text-sm">({pkg.reviews} reviews)</span>
                  </div>
                  <div className="text-xl font-bold">
                    <span className="text-gradient">${pkg.price}</span>
                    {pkg.discount > 0 && (
                      <span className="text-sm line-through text-muted-foreground ml-2">
                        ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button asChild className="w-full rounded-full">
                    <Link href={`/packages/${pkg.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full">
                    <Link href={`/packages/${pkg.id}/book`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
