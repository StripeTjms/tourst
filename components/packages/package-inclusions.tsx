"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

// Mock data for package inclusions
const inclusionsData = {
  included: [
    "All accommodations (4-star hotels)",
    "Daily breakfast, 4 lunches, and 5 dinners",
    "All transportation in air-conditioned vehicles",
    "English-speaking tour guide",
    "Entrance fees to all attractions mentioned in the itinerary",
    "Welcome dinner with traditional dance performance",
    "Dolphin watching tour in Lovina",
    "Airport transfers on arrival and departure",
    "Bottled water during tours",
    "All applicable taxes and fees",
  ],
  excluded: [
    "International airfare",
    "Travel insurance",
    "Personal expenses (laundry, phone calls, etc.)",
    "Alcoholic beverages",
    "Optional activities not mentioned in the itinerary",
    "Tips for guides and drivers",
    "Visa fees (if applicable)",
  ],
}

export function PackageInclusions() {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">What's Included</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1 rounded-full">
                <Check className="h-4 w-4" />
              </span>
              Included in the Package
            </h3>
            <ul className="space-y-3">
              {inclusionsData.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="bg-destructive/10 text-destructive p-1 rounded-full">
                <X className="h-4 w-4" />
              </span>
              Not Included in the Package
            </h3>
            <ul className="space-y-3">
              {inclusionsData.excluded.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-destructive/10 text-destructive p-1 rounded-full mt-0.5">
                    <X className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
