import { Hero } from "@/components/home/hero"
import { SearchSection } from "@/components/home/search-section"
import { FeaturedDeals } from "@/components/home/featured-deals"
import { PopularDestinations } from "@/components/home/popular-destinations"
import { TravelCategories } from "@/components/home/travel-categories"
import { TravelServices } from "@/components/home/travel-services"
import { TopAgencies } from "@/components/home/top-agencies"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"
import { TrustedPartners } from "@/components/home/trusted-partners"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <ScrollReveal>
        <FeaturedDeals />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={0.1}>
        <PopularDestinations />
      </ScrollReveal>
      <ScrollReveal direction="left" delay={0.1}>
        <TravelCategories />
      </ScrollReveal>
      <ScrollReveal>
        <TravelServices />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <TopAgencies />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={0.1}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <TrustedPartners />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <Newsletter />
      </ScrollReveal>
    </>
  )
}
