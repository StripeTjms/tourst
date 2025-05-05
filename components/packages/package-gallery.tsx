"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

// Mock data for package images
const packageImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=800&width=1200",
    alt: "Beach view",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=800&width=1200",
    alt: "Hotel exterior",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=800&width=1200",
    alt: "Restaurant",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=800&width=1200",
    alt: "Swimming pool",
  },
  {
    id: 5,
    url: "/placeholder.svg?height=800&width=1200",
    alt: "Bedroom",
  },
]

export function PackageGallery({ id }: { id: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? packageImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === packageImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      {/* Main large image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={packageImages[currentImageIndex].url || "/placeholder.svg"}
          alt={packageImages[currentImageIndex].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Thumbnail navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {packageImages.map((image, index) => (
          <button
            key={image.id}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>

      {/* View all images button */}
      <Button
        variant="secondary"
        className="absolute bottom-4 right-4 flex items-center gap-2"
        onClick={() => setShowAllImages(true)}
      >
        <ImageIcon className="h-4 w-4" />
        <span>View All Photos</span>
      </Button>

      {/* Full gallery modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-white text-xl font-bold">All Photos</h3>
            <Button variant="ghost" onClick={() => setShowAllImages(false)} className="text-white">
              Close
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packageImages.map((image) => (
                <div key={image.id} className="relative aspect-video">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
