"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Users, Clock, Star, Share2, Heart, Award, CheckCircle } from "lucide-react"

// Mock data for package details
const packageData = {
  id: "bali-adventure",
  title: "Bali Adventure Package",
  location: "Bali, Indonesia",
  duration: "7 Days / 6 Nights",
  groupSize: "Up to 10 people",
  price: 1299,
  rating: 4.8,
  reviews: 124,
  agency: {
    name: "TravelMasters",
    logo: "/placeholder.svg?height=100&width=100",
    verified: true,
  },
  discount: 15,
  featured: true,
  description:
    "Experience the beauty and culture of Bali with our comprehensive 7-day adventure package. Explore stunning beaches, ancient temples, lush rice terraces, and vibrant local markets. This package includes accommodation in 4-star hotels, daily breakfast, guided tours, and airport transfers.",
  highlights: [
    "Visit the sacred Uluwatu Temple perched on a cliff",
    "Explore the artistic center of Ubud and its monkey forest",
    "Relax on the pristine beaches of Nusa Dua",
    "Experience traditional Balinese dance performances",
    "Enjoy water sports activities in Tanjung Benoa",
    "Trek through the scenic Tegalalang Rice Terraces",
    "Discover the underwater world with a snorkeling trip",
  ],
  tags: ["Beach", "Cultural", "Adventure", "Relaxation", "Nature"],
}

export function PackageDetails({ id }: { id: string }) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {packageData.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{packageData.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{packageData.rating}</span>
            </div>
            <span className="text-muted-foreground">({packageData.reviews} reviews)</span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm">Top Rated</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={packageData.agency.logo || "/placeholder.svg"} alt={packageData.agency.name} />
            <AvatarFallback>{packageData.agency.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{packageData.agency.name}</span>
              {packageData.agency.verified && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">Tour Operator</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Duration</div>
              <div className="text-sm text-muted-foreground">{packageData.duration}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Group Size</div>
              <div className="text-sm text-muted-foreground">{packageData.groupSize}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Tour Type</div>
              <div className="text-sm text-muted-foreground">Guided Tour</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-4">
          <p className="text-muted-foreground">{packageData.description}</p>
        </TabsContent>
        <TabsContent value="highlights" className="pt-4">
          <ul className="space-y-2">
            {packageData.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="details" className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Languages</h3>
              <p className="text-muted-foreground">English, Indonesian</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Accessibility</h3>
              <p className="text-muted-foreground">Not wheelchair accessible</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Cancellation Policy</h3>
              <p className="text-muted-foreground">Free cancellation up to 7 days before the start date</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
