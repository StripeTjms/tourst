"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowUpDown,
  Clock,
  Heart,
  PlaneTakeoff,
  PlaneLanding,
  Wifi,
  Coffee,
  Monitor,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react"

export function SearchResults({ filters, onFiltersChange }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("flight") // 'flight', 'hotel', 'visa', 'package'
  const [sortOption, setSortOption] = useState("recommended")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      let url = `/api/aggregator?type=${type}`
      // Add more query params for filters if needed
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          }
        })
      }
      const res = await fetch(url)
      const data = await res.json()
      setResults(data.data)
      setLoading(false)
    }
    fetchData()
  }, [type, filters])

  const handleSort = (value) => {
    setLoading(true)
    setSortOption(value)
    setTimeout(() => {
      let sortedResults = [...results]
      switch (value) {
        case "price-asc":
          sortedResults.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          sortedResults.sort((a, b) => b.price - a.price)
          break
        case "duration-asc":
          sortedResults.sort((a, b) => {
            if (a.duration && b.duration) {
              const durationA = parseInt(a.duration)
              const durationB = parseInt(b.duration)
              return durationA - durationB
            }
            return 0
          })
          break
        case "rating-desc":
          sortedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        default:
          // Default sorting (recommended)
          break
      }
      setResults(sortedResults)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex gap-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flight">Flights</SelectItem>
              <SelectItem value="hotel">Hotels</SelectItem>
              <SelectItem value="visa">Visas</SelectItem>
              <SelectItem value="package">Packages</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={handleSort}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="duration-asc">Shortest Duration</SelectItem>
              <SelectItem value="rating-desc">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <Filter className="h-4 w-4 mr-2" /> Filters
        </Button>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          : results && results.length > 0
          ? results.map((item) => (
              <Card key={item.id} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  {type === "flight" && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Image src={item.airlineLogo || "/placeholder.svg"} alt={item.airline} width={40} height={40} />
                        <div className="font-bold text-lg">{item.airline}</div>
                        <Badge variant={item.bestDeal ? "default" : "outline"} className="ml-2">
                          {item.bestDeal ? "Best Deal" : ""}
                        </Badge>
                        <Badge variant={item.lowestPrice ? "secondary" : "outline"} className="ml-2">
                          {item.lowestPrice ? "Lowest Price" : ""}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Departure</div>
                          <div className="font-medium">{item.departure || item.departureTime}</div>
                        </div>
                        <PlaneTakeoff className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">Arrival</div>
                          <div className="font-medium">{item.arrival || item.arrivalTime}</div>
                        </div>
                        <PlaneLanding className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                          <div className="font-medium">{item.duration || "-"}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center mb-2">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <Coffee className="h-4 w-4 text-muted-foreground" />
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.amenities?.join(", ")}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium">{item.rating || "-"}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews || 0} reviews)</span>
                        </div>
                        <div className="text-xl font-bold">
                          {item.currency || "USD"} {item.price}
                        </div>
                        <Link href={item.bookingUrl || "#"} target="_blank">
                          <Button size="sm">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  {type === "hotel" && (
                    <div>
                      <div className="font-bold text-lg mb-2">{item.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{item.location}</div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{item.rating || "-"}</span>
                      </div>
                      <div className="text-xl font-bold mb-2">{item.currency || "USD"} {item.price}</div>
                      <Link href={item.bookingUrl || "#"} target="_blank">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  )}
                  {type === "visa" && (
                    <div>
                      <div className="font-bold text-lg mb-2">Visa for {item.country}</div>
                      <div className="text-sm text-muted-foreground mb-2">Agency: {item.agency}</div>
                      <div className="text-xl font-bold mb-2">{item.currency || "USD"} {item.price}</div>
                      <Link href={item.detailsUrl || "#"} target="_blank">
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  )}
                  {type === "package" && (
                    <div>
                      <div className="font-bold text-lg mb-2">{item.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">Duration: {item.duration}</div>
                      <div className="text-sm text-muted-foreground mb-2">Agency: {item.agency}</div>
                      <div className="text-xl font-bold mb-2">{item.currency || "USD"} {item.price}</div>
                      <Link href={item.bookingUrl || "#"} target="_blank">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          : (
            <div className="col-span-full text-center text-muted-foreground py-12">No results found.</div>
          )}
      </div>
    </div>
  )
}
