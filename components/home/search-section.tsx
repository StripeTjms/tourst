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
import { CalendarIcon, PlaneTakeoff, Building2, Package, Stamp, Car, MapPin, Search, Palmtree } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

export function SearchSection() {
  const [flightType, setFlightType] = useState("oneWay")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [priceRange, setPriceRange] = useState([0, 5000])

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
              <TabsList className="w-full h-auto p-0 bg-muted/50 rounded-t-lg rounded-b-none grid grid-cols-3 sm:grid-cols-6">
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
                <TabsTrigger value="cars" className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2">
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Cars</span>
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="data-[state=active]:bg-background rounded-b-none py-4 flex gap-2"
                >
                  <Palmtree className="h-4 w-4" />
                  <span className="hidden sm:inline">Activities</span>
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
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="first" id="first" />
                          <Label htmlFor="first">First</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="from" placeholder="City or Airport" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="to" placeholder="City or Airport" className="pl-9" />
                      </div>
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
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="px-3 pt-6 pb-2">
                        <Slider
                          defaultValue={[0, 5000]}
                          max={10000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="destination" placeholder="City, region, or hotel name" className="pl-9" />
                      </div>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Hotel Class</Label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select hotel class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Class</SelectItem>
                          <SelectItem value="5">5 Star</SelectItem>
                          <SelectItem value="4">4 Star & Above</SelectItem>
                          <SelectItem value="3">3 Star & Above</SelectItem>
                          <SelectItem value="2">2 Star & Above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="px-3 pt-6 pb-2">
                        <Slider
                          defaultValue={[0, 500]}
                          max={2000}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0]}/night</span>
                          <span>${priceRange[1]}/night</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button size="lg" className="w-full">
                        <Search className="mr-2 h-4 w-4" /> Search Hotels
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="packageDestination">Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="packageDestination" placeholder="Where do you want to go?" className="pl-9" />
                      </div>
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
                      <div className="px-3 pt-6 pb-2">
                        <Slider
                          defaultValue={[500, 3000]}
                          max={10000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
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

              <TabsContent value="cars" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="pickupLocation" placeholder="City or Airport" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoffLocation">Drop-off Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="dropoffLocation" placeholder="City or Airport" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Pickup Date & Time</Label>
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
                      <Label>Drop-off Date & Time</Label>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Car Type</Label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Type</SelectItem>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="midsize">Midsize</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="px-3 pt-6 pb-2">
                        <Slider
                          defaultValue={[0, 200]}
                          max={500}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0]}/day</span>
                          <span>${priceRange[1]}/day</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Cars
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="m-0 p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activityLocation">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="activityLocation" placeholder="City or Destination" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
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
                      <Label>Activity Type</Label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Type</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="food">Food & Drink</SelectItem>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="water">Water Activities</SelectItem>
                          <SelectItem value="wellness">Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Participants</Label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of participants" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5+ People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="px-3 pt-6 pb-2">
                        <Slider
                          defaultValue={[0, 300]}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Find Activities
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
