"use client"

import { useEffect, useState } from "react"

const AGENCIES = ["ShareTrip", "GoZayaan", "Flight Expert", "Travelz"];
const TYPES = ["flight", "hotel", "package", "visa"];

export default function ComparePage() {
  const [data, setData] = useState<any[]>([]);
  const [type, setType] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      let all: any[] = [];
      for (const t of TYPES) {
        const res = await fetch(`/api/aggregator?type=${t}`);
        const json = await res.json();
        all = all.concat(json.data.map((item: any) => ({ ...item, _type: t })));
      }
      setData(all);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const filtered = data.filter((item) => {
    if (type && item._type !== type) return false;
    if (agency && item.agency !== agency) return false;
    if (location) {
      if (item.location && !item.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (item.arrival && !item.arrival.toLowerCase().includes(location.toLowerCase())) return false;
      if (item.country && !item.country.toLowerCase().includes(location.toLowerCase())) return false;
    }
    if (search) {
      const s = search.toLowerCase();
      if (
        !(item.title?.toLowerCase().includes(s) ||
          item.name?.toLowerCase().includes(s) ||
          item.agency?.toLowerCase().includes(s) ||
          item.location?.toLowerCase().includes(s) ||
          item.arrival?.toLowerCase().includes(s) ||
          item.country?.toLowerCase().includes(s))
      ) {
        return false;
      }
    }
    if (minPrice && Number(item.price) < Number(minPrice)) return false;
    if (maxPrice && Number(item.price) > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Compare Travel Deals</h1>
      <p className="text-muted-foreground mb-8">Compare flights, hotels, packages, and visas from top Bangladeshi online travel agencies. Filter by agency, location, price, and more.</p>
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by destination, agency, etc."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 min-w-[200px]"
        />
        <select value={type} onChange={e => setType(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Types</option>
          {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <select value={agency} onChange={e => setAgency(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Agencies</option>
          {AGENCIES.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <input
          type="text"
          placeholder="Location/Country"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="border rounded px-3 py-2 min-w-[150px]"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border rounded px-3 py-2 w-24"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border rounded px-3 py-2 w-24"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Title/Name</th>
                <th className="p-2 border">Agency</th>
                <th className="p-2 border">Location/Arrival</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-4">No results found.</td></tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-2 border">{item._type.charAt(0).toUpperCase() + item._type.slice(1)}</td>
                    <td className="p-2 border">{item.title || item.name || item.airline || '-'}</td>
                    <td className="p-2 border">{item.agency}</td>
                    <td className="p-2 border">{item.location || item.arrival || item.country || '-'}</td>
                    <td className="p-2 border">{item.price ? `$${item.price}` : '-'}</td>
                    <td className="p-2 border">
                      {item.bookingUrl || item.detailsUrl ? (
                        <a href={item.bookingUrl || item.detailsUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">View</a>
                      ) : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 