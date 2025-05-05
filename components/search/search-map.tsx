"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2, Minimize2 } from "lucide-react"

export function SearchMap() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`relative mb-6 rounded-xl overflow-hidden border border-border transition-all duration-300 ${isExpanded ? "h-[500px]" : "h-[200px]"}`}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Interactive map would be displayed here</p>
          <p className="text-sm text-muted-foreground">Showing search results locations</p>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 right-4 z-10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <Minimize2 className="h-4 w-4 mr-2" /> Collapse Map
          </>
        ) : (
          <>
            <Maximize2 className="h-4 w-4 mr-2" /> Expand Map
          </>
        )}
      </Button>
    </div>
  )
}
