"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Utensils, Bed, Car, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for package itinerary
const itineraryData = [
  {
    day: 1,
    title: "Arrival in Bali & Welcome Dinner",
    description:
      "Arrive at Ngurah Rai International Airport where you'll be greeted by our representative. Transfer to your hotel in Kuta and enjoy some free time to relax. In the evening, join us for a welcome dinner featuring traditional Balinese cuisine and a cultural dance performance.",
    activities: [
      { time: "14:00", description: "Airport pickup & hotel transfer", icon: "car" },
      { time: "16:00", description: "Hotel check-in & free time", icon: "bed" },
      { time: "19:00", description: "Welcome dinner & cultural show", icon: "utensils" },
    ],
    meals: ["dinner"],
    accommodation: "Kuta Paradiso Hotel or similar (4-star)",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    day: 2,
    title: "Uluwatu Temple & Jimbaran Bay",
    description:
      "After breakfast, spend the morning at leisure. In the afternoon, visit the magnificent Uluwatu Temple perched on a cliff with stunning ocean views. Watch the famous Kecak fire dance performance at sunset. End the day with a seafood dinner on Jimbaran Beach.",
    activities: [
      { time: "07:00", description: "Breakfast at hotel", icon: "coffee" },
      { time: "12:00", description: "Lunch at local restaurant", icon: "utensils" },
      { time: "14:00", description: "Uluwatu Temple tour", icon: "car" },
      { time: "18:00", description: "Kecak dance performance", icon: "car" },
      { time: "19:30", description: "Seafood dinner at Jimbaran Bay", icon: "utensils" },
    ],
    meals: ["breakfast", "lunch", "dinner"],
    accommodation: "Kuta Paradiso Hotel or similar (4-star)",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    day: 3,
    title: "Ubud Art Villages & Monkey Forest",
    description:
      "Today we'll explore the cultural heart of Bali. Visit traditional art villages including Celuk (silver work), Mas (wood carving), and Batuan (traditional painting). Explore the sacred Monkey Forest Sanctuary and visit the Ubud Royal Palace. Enjoy lunch at a restaurant overlooking the Tegalalang Rice Terraces.",
    activities: [
      { time: "07:00", description: "Breakfast at hotel", icon: "coffee" },
      { time: "09:00", description: "Depart for Ubud art villages tour", icon: "car" },
      { time: "12:30", description: "Lunch with rice terrace view", icon: "utensils" },
      { time: "14:00", description: "Sacred Monkey Forest visit", icon: "car" },
      { time: "16:00", description: "Ubud Royal Palace tour", icon: "car" },
      { time: "18:00", description: "Return to hotel & dinner", icon: "utensils" },
    ],
    meals: ["breakfast", "lunch", "dinner"],
    accommodation: "Alaya Resort Ubud or similar (4-star)",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    day: 4,
    title: "Water Temple & Hot Springs",
    description:
      "Visit the beautiful Ulun Danu Beratan Temple on Lake Bratan. Continue to the Gitgit Waterfall for a refreshing experience. Enjoy lunch at a local restaurant before relaxing in the natural hot springs at Banjar. End the day with a sunset dinner at a beachfront restaurant.",
    activities: [
      { time: "07:00", description: "Breakfast at hotel", icon: "coffee" },
      { time: "09:00", description: "Depart for Ulun Danu Beratan Temple", icon: "car" },
      { time: "12:00", description: "Lunch at local restaurant", icon: "utensils" },
      { time: "14:00", description: "Gitgit Waterfall visit", icon: "car" },
      { time: "16:00", description: "Banjar Hot Springs relaxation", icon: "car" },
      { time: "18:30", description: "Sunset dinner at beachfront restaurant", icon: "utensils" },
    ],
    meals: ["breakfast", "lunch", "dinner"],
    accommodation: "Lovina Beach Resort or similar (4-star)",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    day: 5,
    title: "Dolphin Watching & Return to Kuta",
    description:
      "Early morning dolphin watching tour at Lovina Beach. After breakfast, visit the Ulun Danu Beratan Temple and the Jatiluwih Rice Terraces, a UNESCO World Heritage site. Return to Kuta in the afternoon with a stop at the famous Tanah Lot Temple for sunset views.",
    activities: [
      { time: "05:30", description: "Dolphin watching tour", icon: "car" },
      { time: "08:00", description: "Breakfast at hotel", icon: "coffee" },
      { time: "10:00", description: "Jatiluwih Rice Terraces tour", icon: "car" },
      { time: "13:00", description: "Lunch at local restaurant", icon: "utensils" },
      { time: "15:00", description: "Depart for Tanah Lot Temple", icon: "car" },
      { time: "17:30", description: "Sunset at Tanah Lot Temple", icon: "car" },
      { time: "19:30", description: "Return to Kuta & farewell dinner", icon: "utensils" },
    ],
    meals: ["breakfast", "lunch", "dinner"],
    accommodation: "Kuta Paradiso Hotel or similar (4-star)",
    image: "/placeholder.svg?height=300&width=500",
  },
]

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "car":
      return <Car className="h-4 w-4" />
    case "bed":
      return <Bed className="h-4 w-4" />
    case "utensils":
      return <Utensils className="h-4 w-4" />
    case "coffee":
      return <Coffee className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}

export function PackageItinerary() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>

        <Tabs defaultValue="day-1" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap justify-start pb-1">
            {itineraryData.map((day) => (
              <TabsTrigger
                key={day.day}
                value={`day-${day.day}`}
                className="min-w-[100px] whitespace-nowrap"
                onClick={() => setActiveDay(day.day)}
              >
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {itineraryData.map((day) => (
            <TabsContent key={day.day} value={`day-${day.day}`} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-4">
                  <h3 className="text-xl font-bold">{day.title}</h3>
                  <p className="text-muted-foreground">{day.description}</p>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Daily Schedule
                    </h4>
                    <div className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-md p-2 mt-0.5">
                            {getIconComponent(activity.icon)}
                          </div>
                          <div>
                            <p className="font-medium">{activity.time}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Meals Included</h4>
                      <div className="flex gap-2">
                        {["breakfast", "lunch", "dinner"].map((meal) => (
                          <span
                            key={meal}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs capitalize",
                              day.meals.includes(meal)
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground line-through",
                            )}
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Accommodation</h4>
                      <p className="text-sm flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>{day.accommodation}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={day.image || "/placeholder.svg"}
                      alt={`Day ${day.day} - ${day.title}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
