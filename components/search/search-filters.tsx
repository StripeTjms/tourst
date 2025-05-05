"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button variant="ghost" size="sm" className="h-8 text-sm">
          Reset All
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <button onClick={() => removeFilter(filter)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["price", "rating", "airlines", "stops"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-2">
              <Slider
                defaultValue={[0, 2000]}
                max={5000}
                step={50}
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value)
                  addFilter(`$${value[0]} - $${value[1]}`)
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="any">
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any Rating</Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="5" id="5star" onClick={() => addFilter("5 Star")} />
                <Label htmlFor="5star" className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="4" id="4star" onClick={() => addFilter("4+ Star")} />
                <Label htmlFor="4star" className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="ml-1">& up</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="3" id="3star" onClick={() => addFilter("3+ Star")} />
                <Label htmlFor="3star" className="flex items-center">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                  <span className="ml-1">& up</span>
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="airlines">
          <AccordionTrigger>Airlines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="airline1" onClick={() => addFilter("Emirates")} />
                <Label htmlFor="airline1">Emirates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline2" onClick={() => addFilter("Qatar Airways")} />
                <Label htmlFor="airline2">Qatar Airways</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline3" onClick={() => addFilter("Singapore Airlines")} />
                <Label htmlFor="airline3">Singapore Airlines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline4" onClick={() => addFilter("Lufthansa")} />
                <Label htmlFor="airline4">Lufthansa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline5" onClick={() => addFilter("British Airways")} />
                <Label htmlFor="airline5">British Airways</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stops">
          <AccordionTrigger>Stops</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="any">
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="any" id="any-stops" />
                <Label htmlFor="any-stops">Any</Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="nonstop" id="nonstop" onClick={() => addFilter("Non-stop")} />
                <Label htmlFor="nonstop">Non-stop</Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="1stop" id="1stop" onClick={() => addFilter("1 Stop")} />
                <Label htmlFor="1stop">1 Stop</Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem value="2stops" id="2stops" onClick={() => addFilter("2+ Stops")} />
                <Label htmlFor="2stops">2+ Stops</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger>Duration</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-2">
              <Slider
                defaultValue={[0, 24]}
                max={48}
                step={1}
                onValueChange={(value) => addFilter(`${value[0]}h - ${value[1]}h`)}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>0h</span>
                <span>48h</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="times">
          <AccordionTrigger>Times</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Departure</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Morning Departure")}
                  >
                    Morning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Afternoon Departure")}
                  >
                    Afternoon
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Evening Departure")}
                  >
                    Evening
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Night Departure")}
                  >
                    Night
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Arrival</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Morning Arrival")}
                  >
                    Morning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Afternoon Arrival")}
                  >
                    Afternoon
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Evening Arrival")}
                  >
                    Evening
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addFilter("Night Arrival")}
                  >
                    Night
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  )
}
