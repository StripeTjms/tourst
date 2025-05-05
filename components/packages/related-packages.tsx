"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, Calendar, Users } from "lucide-react"
import Link from "next/link"

// Mock data for related packages
const relatedPackagesData = [
  {
    id: 1,
    title: "Lombok Island Explorer",
    description: "Discover the pristine beaches and waterfalls of Lombok on this 4-day adventure",
    image: "/placeholder.svg?height=200&width=300",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 86,
    duration: "4 days",
    departures: "Weekly",
    groupSize: "Max 12",
    featured: true,
  },
  {
    id: 2,
    title: "Java Cultural Heritage",
    description: "Explore ancient temples and volcanic landscapes in Java",
    image: "/placeholder.svg?height=200&width=300",
    price: 1199,
    originalPrice: 1399,
    rating: 4.7,
    reviews: 124,
    duration: "6 days",
    departures: "Bi-weekly",
    groupSize: "Max 10",
    featured: false,
  },
  {
    id: 3,
    title: "Komodo Dragon Adventure",
    description: "See the famous Komodo dragons and snorkel in crystal clear waters",
    image: "/placeholder.svg?height=200&width=300",
    price: 1499,
    originalPrice: 1699,
    rating: 4.9,
    reviews: 58,
    duration: "5 days",
    departures: "Monthly",
    groupSize: "Max 8",
    featured: false,
  },
]

export function RelatedPackages() {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPackagesData.map((pkg) => (
            <Link href={`/packages/${pkg.id}`} key={pkg.id} className="group">
              <div className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="relative">
                  <img
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {pkg.featured && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-background/90 text-foreground text-sm px-2 py-1 rounded-md backdrop-blur-sm">
                    <span className="font-bold">${pkg.price}</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-xs line-through ml-1 text-muted-foreground">${pkg.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({pkg.reviews} reviews)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{pkg.departures}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
