"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    location: "New York, USA",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Toureest made planning our family vacation so easy! We were able to compare different packages and found the perfect one for our budget. The customer service was exceptional when we needed to make some last-minute changes.",
    destination: "Thailand",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "I've used many travel booking platforms before, but Toureest stands out with its user-friendly interface and comprehensive options. I was able to customize my European tour exactly how I wanted it. Will definitely use again!",
    destination: "Europe",
  },
  {
    id: 3,
    name: "Farzana Islam",
    location: "Sydney, Australia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "The visa service provided by Toureest saved me so much time and hassle. The step-by-step guidance made the process straightforward, and I got my visa approved without any issues. Highly recommend their services!",
    destination: "Japan",
  },
  {
    id: 4,
    name: "Rashed Chowdhury",
    location: "Dubai, UAE",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4,
    text: "What impressed me most was how Toureest connected me with local travel agencies that I wouldn't have found otherwise. The package I booked included unique experiences that made my trip truly memorable.",
    destination: "Maldives",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from travelers who have experienced our services and explored destinations around the
            world with Toureest.
          </p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 opacity-20">
              <Quote className="h-20 w-20 text-primary" />
            </div>

            <div className="bg-card rounded-xl p-8 md:p-10 border border-border relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback>{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < testimonials[currentIndex].rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <blockquote className="text-lg mb-4 italic">"{testimonials[currentIndex].text}"</blockquote>

                  <div>
                    <div className="font-semibold">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-2">
                      <span>{testimonials[currentIndex].location}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Trip to {testimonials[currentIndex].destination}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 p-0 rounded-full ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </Button>
              ))}
              <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
