"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  PlaneTakeoff,
  Building2,
  Package,
  Stamp,
  Car,
  Palmtree,
  UtensilsCrossed,
  Ticket,
  Ship,
  Tent,
} from "lucide-react"

const categories = [
  {
    id: "flights",
    title: "Flights",
    description: "Find the best deals on flights worldwide",
    icon: <PlaneTakeoff className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
    link: "/services/flights",
  },
  {
    id: "hotels",
    title: "Hotels",
    description: "Book accommodations that fit your style and budget",
    icon: <Building2 className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/services/hotels",
  },
  {
    id: "packages",
    title: "Tour Packages",
    description: "All-inclusive packages for hassle-free travel",
    icon: <Package className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/services/packages",
  },
  {
    id: "visa",
    title: "Visa Services",
    description: "Streamlined visa application process",
    icon: <Stamp className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    link: "/services/visa",
  },
  {
    id: "cars",
    title: "Car Rentals",
    description: "Rent vehicles for your journey",
    icon: <Car className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e",
    link: "/services/cars",
  },
  {
    id: "activities",
    title: "Activities",
    description: "Discover exciting experiences at your destination",
    icon: <Palmtree className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    link: "/services/activities",
  },
  {
    id: "dining",
    title: "Dining",
    description: "Reserve tables at top restaurants worldwide",
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    link: "/services/dining",
  },
  {
    id: "events",
    title: "Events & Shows",
    description: "Get tickets to concerts, sports, and more",
    icon: <Ticket className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    link: "/services/events",
  },
  {
    id: "cruises",
    title: "Cruises",
    description: "Explore the seas with luxury cruise packages",
    icon: <Ship className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/services/cruises",
  },
  {
    id: "adventure",
    title: "Adventure",
    description: "Thrilling experiences for adventure seekers",
    icon: <Tent className="h-10 w-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    link: "/services/adventure",
  },
]

export function TravelCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Explore Travel Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover all the ways you can explore the world with our comprehensive travel services. From flights and
            hotels to unique experiences, we've got you covered.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={category.link}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 h-full"
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
