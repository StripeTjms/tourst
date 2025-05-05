import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PackageDetails } from "@/components/packages/package-details"
import { PackageGallery } from "@/components/packages/package-gallery"
import { PackageItinerary } from "@/components/packages/package-itinerary"
import { PackageInclusions } from "@/components/packages/package-inclusions"
import { PackageReviews } from "@/components/packages/package-reviews"
import { PackageBooking } from "@/components/packages/package-booking"
import { PackageMap } from "@/components/packages/package-map"
import { RelatedPackages } from "@/components/packages/related-packages"

export default function PackageDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PackageGallery id={params.id} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PackageDetails id={params.id} />
              <PackageItinerary id={params.id} />
              <PackageInclusions id={params.id} />
              <PackageMap id={params.id} />
              <PackageReviews id={params.id} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PackageBooking id={params.id} />
              </div>
            </div>
          </div>
          <RelatedPackages id={params.id} />
        </div>
      </main>
      <Footer />
    </>
  )
}
