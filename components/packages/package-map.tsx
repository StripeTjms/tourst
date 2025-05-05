"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin } from "lucide-react"

// Mock data for package map
const mapData = {
  center: { lat: -8.4095, lng: 115.1889 }, // Bali, Indonesia
  locations: [
    {
      id: 1,
      name: "Kuta",
      description: "Starting point of the tour. Known for its beaches and nightlife.",
      days: [1, 2, 5],
      position: { top: "60%", left: "20%" },
    },
    {
      id: 2,
      name: "Ubud",
      description: "Cultural heart of Bali with art villages and the famous Monkey Forest.",
      days: [3],
      position: { top: "40%", left: "40%" },
    },
    {
      id: 3,
      name: "Ulun Danu Beratan Temple",
      description: "Beautiful temple on Lake Bratan.",
      days: [4],
      position: { top: "20%", left: "30%" },
    },
    {
      id: 4,
      name: "Lovina",
      description: "Known for dolphin watching and black sand beaches.",
      days: [4, 5],
      position: { top: "10%", left: "40%" },
    },
    {
      id: 5,
      name: "Tanah Lot Temple",
      description: "Famous sea temple with stunning sunset views.",
      days: [5],
      position: { top: "70%", left: "10%" },
    },
    {
      id: 6,
      name: "Uluwatu Temple",
      description: "Clifftop temple with Kecak fire dance performances.",
      days: [2],
      position: { top: "80%", left: "15%" },
    },
    {
      id: 7,
      name: "Jatiluwih Rice Terraces",
      description: "UNESCO World Heritage site with beautiful rice terraces.",
      days: [5],
      position: { top: "30%", left: "25%" },
    },
  ],
}

export function PackageMap() {
  const [activeLocation, setActiveLocation] = useState<number | null>(null)
  const [activeDay, setActiveDay] = useState<number | null>(null)

  const filteredLocations = activeDay
    ? mapData.locations.filter((location) => location.days.includes(activeDay))
    : mapData.locations

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Tour Map</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap justify-start pb-1">
            <TabsTrigger value="all" className="min-w-[80px]" onClick={() => setActiveDay(null)}>
              All Days
            </TabsTrigger>
            {[1, 2, 3, 4, 5].map((day) => (
              <TabsTrigger key={day} value={`day-${day}`} className="min-w-[80px]" onClick={() => setActiveDay(day)}>
                Day {day}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden mb-6">
            {/* This would be a real map in production */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center">
              {/* Map pins */}
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group`}
                  style={{ top: location.position.top, left: location.position.left }}
                  onClick={() => setActiveLocation(activeLocation === location.id ? null : location.id)}
                >
                  <div
                    className={`
                    flex items-center justify-center w-6 h-6 rounded-full 
                    ${activeLocation === location.id ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}
                    shadow-md transition-all duration-200 hover:scale-110
                  `}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div
                    className={`
                    absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48
                    bg-background border border-border rounded-md p-2 shadow-lg
                    transition-opacity duration-200
                    ${activeLocation === location.id ? "opacity-100" : "opacity-0 pointer-events-none"}
                  `}
                  >
                    <p className="font-medium text-sm">{location.name}</p>
                    <p className="text-xs text-muted-foreground">{location.description}</p>
                    <div className="flex gap-1 mt-1">
                      {location.days.map((day) => (
                        <span key={day} className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                          Day {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`
                  p-3 rounded-md border cursor-pointer transition-colors
                  ${activeLocation === location.id ? "border-primary bg-primary/5" : "border-border bg-card"}
                `}
                onClick={() => setActiveLocation(activeLocation === location.id ? null : location.id)}
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    className={`h-4 w-4 ${activeLocation === location.id ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <h3 className="font-medium">{location.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
                <div className="flex gap-1 mt-2">
                  {location.days.map((day) => (
                    <span key={day} className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                      Day {day}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
