"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, PlaneTakeoff, Building2, Package, Stamp, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchSection() {
  const [flightType, setFlightType] = useState("oneWay")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  return (
    <section className="relative z-10 -mt-24 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="shadow-xl border-none">
          <CardContent className="p-0">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="w-full h-auto p-0 bg-muted/50 rounded-t-lg rounded-b-none grid grid-cols-4 sm:grid-cols-4">
                <TabsTrigger
                  value="flights"
                  className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2"
                >
                  <PlaneTakeoff className="h-4 w-4" />
                  <span className="hidden sm:inline">Flights</span>
                </TabsTrigger>
                <TabsTrigger
                  value="hotels"
                  className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Hotels</span>
                </TabsTrigger>
                <TabsTrigger
                  value="packages"
                  className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2"
                >
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Packages</span>
                </TabsTrigger>
                <TabsTrigger value="visa" className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2">
                  <Stamp className="h-4 w-4" />
                  <span className="hidden sm:inline">Visa</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flights" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroup defaultValue="oneWay" className="flex space-x-4" onValueChange={setFlightType}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oneWay" id="oneWay" />
                          <Label htmlFor="oneWay">One Way</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="roundTrip" id="roundTrip" />
                          <Label htmlFor="roundTrip">Round Trip</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiCity" id="multiCity" />
                          <Label htmlFor="multiCity">Multi City</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroup defaultValue="economy" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="economy" id="economy" />
                          <Label htmlFor="economy">Economy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business">Business</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <Input id="from" placeholder="City or Airport" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <Input id="to" placeholder="City or Airport" />
                    </div>
                    <div className="space-y-2">
                      <Label>Departure</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {flightType === "roundTrip" && (
                      <div className="space-y-2">
                        <Label>Return</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !returnDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                    {flightType === "multiCity" && (
                      <div className="space-y-2">
                        <Label>Add City</Label>
                        <Button variant="outline" className="w-full">
                          + Add Another City
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Travelers</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4 Adults</SelectItem>
                          <SelectItem value="family">2 Adults, 2 Children</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 flex items-end">
                      <Button className="w-full md:w-auto ml-auto" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hotels" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="City, region, or hotel name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Guests & Rooms</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult, 1 Room</SelectItem>
                          <SelectItem value="2">2 Adults, 1 Room</SelectItem>
                          <SelectItem value="3">2 Adults, 2 Children, 1 Room</SelectItem>
                          <SelectItem value="4">2 Adults, 2 Rooms</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button size="lg">
                      <Search className="mr-2 h-4 w-4" /> Search Hotels
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="packageDestination">Destination</Label>
                      <Input id="packageDestination" placeholder="Where do you want to go?" />
                    </div>
                    <div className="space-y-2">
                      <Label>Travel Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select defaultValue="7">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="10">10 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Travelers</Label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                          <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Find Packages
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visa" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination Country</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Visa Type</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select visa type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tourist">Tourist Visa</SelectItem>
                          <SelectItem value="business">Business Visa</SelectItem>
                          <SelectItem value="student">Student Visa</SelectItem>
                          <SelectItem value="work">Work Visa</SelectItem>
                          <SelectItem value="transit">Transit Visa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Travel Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Check Requirements
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
