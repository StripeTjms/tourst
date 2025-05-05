"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Globe, Sun, Moon, Search, ShoppingCart, Bell, LogIn, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  // Mock authentication state - replace with actual auth
  const isAuthenticated = false

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  }

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  const searchBarVariants = {
    closed: {
      maxHeight: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      maxHeight: 80,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative w-10 h-10"
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="absolute w-8 h-8 bg-primary rotate-45 top-1 left-1"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
          </motion.div>
          <motion.span
            className={cn(
              "text-2xl font-bold",
              isScrolled ? "text-primary dark:text-primary" : "text-primary dark:text-white",
            )}
            whileHover={{ scale: 1.05 }}
          >
            Toureest
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {["Home", "Destinations", "Services", "Agencies", "Deals", "Blog", "Contact"].map((item, index) => {
            const isDropdown = item === "Destinations" || item === "Services"
            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`
            const isActive = pathname === href

            return isDropdown ? (
              <div key={item} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors hover:text-primary",
                    isScrolled ? "text-gray-800 dark:text-gray-200" : "text-gray-800 dark:text-white",
                  )}
                >
                  {item} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 z-50"
                >
                  <div className={item === "Destinations" ? "py-1 grid grid-cols-2 gap-2 p-4" : "py-1"}>
                    {item === "Destinations" ? (
                      <>
                        {["Asia", "Europe", "North America", "South America", "Africa", "Oceania", "Middle East"].map(
                          (region) => (
                            <Link
                              key={region}
                              href={`/destinations/${region.toLowerCase().replace(" ", "-")}`}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                            >
                              {region}
                            </Link>
                          ),
                        )}
                        <Link
                          href="/destinations"
                          className="block px-4 py-2 text-sm text-primary font-medium hover:bg-primary/10 rounded-md"
                        >
                          View All
                        </Link>
                      </>
                    ) : (
                      <>
                        {[
                          "Flight Booking",
                          "Hotel Reservations",
                          "Tour Packages",
                          "Visa Services",
                          "Car Rental",
                          "Activities & Experiences",
                        ].map((service) => (
                          <Link
                            key={service}
                            href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {service}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : (
              <Link
                key={item}
                href={href}
                className={cn(
                  "font-medium transition-colors hover:text-primary relative",
                  isActive
                    ? "text-primary"
                    : isScrolled
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-gray-800 dark:text-white",
                )}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Deutsch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>العربية</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.1, rotate: theme === "dark" ? 0 : 180 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          {isAuthenticated ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">5</Badge>
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">John Doe</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/reviews">My Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signout">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" asChild className="rounded-full">
                  <Link href="/auth/signin" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" asChild className="rounded-full">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </motion.div>
            </div>
          )}

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={searchBarVariants}
            className="container mx-auto px-4 overflow-hidden"
          >
            <div className="relative py-4">
              <Input
                type="text"
                placeholder="Search destinations, hotels, flights..."
                className="pr-10 rounded-full"
                autoFocus
              />
              <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-4 pt-2 pb-3 space-y-1">
                {["Home", "Destinations", "Services", "Agencies", "Deals", "Blog", "Contact"].map((item, index) => {
                  const isDropdown = item === "Destinations" || item === "Services"
                  const href = item === "Home" ? "/" : `/${item.toLowerCase()}`

                  return isDropdown ? (
                    <motion.div
                      key={item}
                      variants={menuItemVariants}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white"
                    >
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between">
                          {item}
                          <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                        </summary>
                        <ul className="mt-2 space-y-1 px-4">
                          {item === "Destinations" ? (
                            <>
                              {[
                                "Asia",
                                "Europe",
                                "North America",
                                "South America",
                                "Africa",
                                "Oceania",
                                "Middle East",
                              ].map((region) => (
                                <li key={region}>
                                  <Link
                                    href={`/destinations/${region.toLowerCase().replace(" ", "-")}`}
                                    className="block rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {region}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/destinations"
                                  className="block rounded-lg px-4 py-2 text-sm text-primary font-medium hover:bg-primary/10"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  View All
                                </Link>
                              </li>
                            </>
                          ) : (
                            <>
                              {[
                                "Flight Booking",
                                "Hotel Reservations",
                                "Tour Packages",
                                "Visa Services",
                                "Car Rental",
                                "Activities & Experiences",
                              ].map((service) => (
                                <li key={service}>
                                  <Link
                                    href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {service}
                                  </Link>
                                </li>
                              ))}
                            </>
                          )}
                        </ul>
                      </details>
                    </motion.div>
                  ) : (
                    <motion.div key={item} variants={menuItemVariants}>
                      <Link
                        href={href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                })}

                {!isAuthenticated && (
                  <motion.div
                    variants={menuItemVariants}
                    className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center px-5 gap-2">
                      <Button variant="outline" className="w-full rounded-full" asChild>
                        <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full rounded-full" asChild>
                        <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
