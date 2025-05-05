"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  const slides = [
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Discover the World's Most Amazing Places",
      subtitle: "Compare and book flights, hotels, and tour packages from multiple vendors",
      cta: "Start Exploring",
      ctaLink: "/destinations",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Create Your Perfect Travel Experience",
      subtitle: "Customize your own travel packages with our easy-to-use tools",
      cta: "Build Your Trip",
      ctaLink: "/custom-packages",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Exclusive Deals from Top Travel Agencies",
      subtitle: "Find the best prices on flights, hotels, and tour packages",
      cta: "View Deals",
      ctaLink: "/deals",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Split text for character animation
  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.25em]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.05 }}
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div style={{ y }} className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-white"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {splitText(slides[currentSlide].title)}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full animate-pulse-glow hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <a href={slides[currentSlide].ctaLink}>
                    {slides[currentSlide].cta} <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-10" : "bg-white/50 hover:bg-white/80"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ opacity: useTransform(scrollY, [0, 100], [0, 1]) }}
      />
    </section>
  )
}
