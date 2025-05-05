import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchHeader } from "@/components/search/search-header"
import { SearchMap } from "@/components/search/search-map"

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <SearchHeader />
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-1/4">
          <SearchFilters />
        </div>
        <div className="lg:w-3/4">
          <SearchMap />
          <SearchResults />
        </div>
      </div>
    </div>
  )
}
