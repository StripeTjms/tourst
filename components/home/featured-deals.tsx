"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, Users, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const deals = [
  {
    id: 1,
    title: "Bali Adventure Package",
    image: "/placeholder.svg?height=600&width=800",
    location: "Bali, Indonesia",
    duration: "7 Days / 6 Nights",
    groupSize: "Up to 10 people",
    originalPrice: 1599,
    discountedPrice: 1299,
    discount: 20,
    rating: 4.8,
    reviews: 124,
    agency: "TravelMasters",
    featured: true,
    tag: "Best Seller",
    endsIn: "2 days",
  },
  {
    id: 2,
    title: "European Highlights Tour",
    image: "/placeholder.svg?height=600&width=800",
    location: "Multiple Cities, Europe",
    duration: "14 Days / 13 Nights",
    groupSize: "Up to 15 people",
    originalPrice: 3299,
    discountedPrice: 2499,
    discount: 25,
    rating: 4.7,
    reviews: 98,
    agency: "EuroVentures",
    featured: false,
    tag: "Hot Deal",
    endsIn: "5 days",
  },
  {
    id: 3,
    title: "Thailand Beach Getaway",
    image: "/placeholder.svg?height=600&width=800",
    location: "Phuket & Krabi, Thailand",
    duration: "8 Days / 7 Nights",
    groupSize: "Up to 8 people",
    originalPrice: 1299,
    discountedPrice: 999,
    discount: 23,
    rating: 4.9,
    reviews: 156,
    agency: "AsiaEscapes",
    featured: true,
    tag: "Limited Offer",
    endsIn: "3 days",
  },
  {
    id: 4,
    title: "Japan Cherry Blossom Tour",
    image: "/placeholder.svg?height=600&width=800",
    location: "Tokyo, Kyoto, Osaka",
    duration: "10 Days / 9 Nights",
    groupSize: "Up to 12 people",
    originalPrice: 2899,
    discountedPrice: 2299,
    discount: 21,
    rating: 4.9,
    reviews: 87,
    agency: "AsiaEscapes",
    featured: true,
    tag: "Seasonal",
    endsIn: "7 days",
  },
  {
    id: 5,
    title: "New York City Explorer",
    image: "/placeholder.svg?height=600&width=800",
    location: "New York, USA",
    duration: "5 Days / 4 Nights",
    groupSize: "Up to 6 people",
    originalPrice: 1899,
    discountedPrice: 1499,
    discount: 22,
    rating: 4.6,
    reviews: 112,
    agency: "AmericanJourneys",
    featured: false,
    tag: "Weekend Escape",
    endsIn: "4 days",
  },
  {
    id: 6,
    title: "Maldives Luxury Retreat",
    image: "/placeholder.svg?height=600&width=800",
    location: "Maldives",
    duration: "6 Days / 5 Nights",
    groupSize: "Up to 2 people",
    originalPrice: 3499,
    discountedPrice: 2799,
    discount: 20,
    rating: 4.9,
    reviews: 76,
    agency: "LuxuryEscapes",
    featured: true,
    tag: "Honeymoon Special",
    endsIn: "6 days",
  },
]

export function FeaturedDeals() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(
    0,
    deals.length -
      (typeof window !== "undefined" && window.innerWidth >= 1024
        ? 3
        : typeof window !== "undefined" && window.innerWidth >= 768
          ? 2
          : 1),
  )

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hot Deals & Promotions</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our limited-time offers and exclusive deals from top travel agencies. Book now and save big on
              your next adventure!
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
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            style={{
              transform: `translateX(-${currentIndex * (100 / (typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1))}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {deals.map((deal) => (
              <Card
                key={deal.id}
                className={`flex-shrink-0 ${
                  typeof window !== "undefined" && window.innerWidth >= 1024
                    ? "w-[calc(33.333%-1rem)]"
                    : typeof window !== "undefined" && window.innerWidth >= 768
                      ? "w-[calc(50%-0.75rem)]"
                      : "w-full"
                } overflow-hidden border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300`}
              >
                <div className="relative">
                  <div className="aspect-[4/3]">
                    <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="destructive" className="text-xs font-semibold">
                      {deal.discount}% OFF
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {deal.tag}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-xs font-semibold">
                      Ends in {deal.endsIn}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    By {deal.agency}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-1">{deal.title}</h3>

                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{deal.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{deal.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{deal.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{deal.rating}</span>
                      <span className="text-muted-foreground text-sm">({deal.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">${deal.discountedPrice}</span>
                      <span className="text-sm line-through text-muted-foreground">${deal.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-xs">From $108/mo</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                  <Button asChild className="w-full">
                    <Link href={`/deals/${deal.id}`}>View Deal</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/deals">View All Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
