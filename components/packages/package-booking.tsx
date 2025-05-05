"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Check, Info } from "lucide-react"

// Mock data for package booking
const bookingData = {
  price: 1299,
  discount: 200,
  tax: 89,
  availableDates: [
    new Date(2023, 6, 15),
    new Date(2023, 6, 22),
    new Date(2023, 7, 5),
    new Date(2023, 7, 12),
    new Date(2023, 7, 19),
    new Date(2023, 8, 2),
    new Date(2023, 8, 9),
    new Date(2023, 8, 16),
    new Date(2023, 8, 23),
  ],
}

export function PackageBooking() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [travelers, setTravelers] = useState("2")

  const totalPrice = (bookingData.price - bookingData.discount + bookingData.tax) * Number.parseInt(travelers)

  return (
    <Card className="border-border sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold">${bookingData.price}</span>
          <span className="text-lg line-through text-muted-foreground">
            ${bookingData.price + bookingData.discount}
          </span>
          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Save ${bookingData.discount}
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Departure Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) =>
                    !bookingData.availableDates.some(
                      (availableDate) =>
                        availableDate.getDate() === date.getDate() &&
                        availableDate.getMonth() === date.getMonth() &&
                        availableDate.getFullYear() === date.getFullYear(),
                    )
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Number of Travelers</label>
            <Select value={travelers} onValueChange={setTravelers}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of travelers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Traveler</SelectItem>
                <SelectItem value="2">2 Travelers</SelectItem>
                <SelectItem value="3">3 Travelers</SelectItem>
                <SelectItem value="4">4 Travelers</SelectItem>
                <SelectItem value="5">5 Travelers</SelectItem>
                <SelectItem value="6">6+ Travelers (Contact Us)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span>
              Base Price ({travelers} x ${bookingData.price})
            </span>
            <span>${bookingData.price * Number.parseInt(travelers)}</span>
          </div>
          <div className="flex justify-between text-primary">
            <span>Discount</span>
            <span>-${bookingData.discount * Number.parseInt(travelers)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Fees</span>
            <span>${bookingData.tax * Number.parseInt(travelers)}</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <Button className="w-full mb-4">Book Now</Button>

        <div className="text-xs text-muted-foreground space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Free cancellation up to 30 days before departure</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Pay only 20% deposit now, rest later</span>
          </div>
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Prices are per person based on double occupancy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
