"use client";

import { useState } from "react";

const AIRPORTS = [
  { city: "Dhaka", code: "DAC", country: "Bangladesh" },
  { city: "Bangkok", code: "BKK", country: "Thailand" },
  { city: "London", code: "LHR", country: "UK" },
  { city: "New York", code: "JFK", country: "USA" },
  { city: "Dubai", code: "DXB", country: "UAE" },
  { city: "Kuala Lumpur", code: "KUL", country: "Malaysia" },
  { city: "Singapore", code: "SIN", country: "Singapore" },
  { city: "Paris", code: "CDG", country: "France" },
  { city: "Istanbul", code: "IST", country: "Turkey" },
  { city: "Delhi", code: "DEL", country: "India" },
];

const TRIP_TYPES = ["One Way", "Round Trip", "Multi City"];
const CLASSES = ["Economy", "Business", "First"];

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [flightClass, setFlightClass] = useState("Economy");
  const [travelers, setTravelers] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/aggregator?type=flight`);
      const json = await res.json();
      let filtered = json.data;
      if (from) filtered = filtered.filter((f: any) => f.departure?.toLowerCase().includes(from.toLowerCase()));
      if (to) filtered = filtered.filter((f: any) => f.arrival?.toLowerCase().includes(to.toLowerCase()));
      if (price[0]) filtered = filtered.filter((f: any) => Number(f.price) >= price[0]);
      if (price[1]) filtered = filtered.filter((f: any) => Number(f.price) <= price[1]);
      setResults(filtered);
    } catch (e) {
      setError("Failed to fetch flights.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <div className="flex gap-6 mb-6">
        {TRIP_TYPES.map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
              className="accent-orange-500"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="City or Airport"
            value={from}
            onChange={e => { setFrom(e.target.value); setShowFromSuggestions(true); }}
            onFocus={() => setShowFromSuggestions(true)}
            onBlur={() => setTimeout(() => setShowFromSuggestions(false), 100)}
            className="border rounded px-3 py-2 w-full"
          />
          {showFromSuggestions && (
            <div className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow">
              {AIRPORTS.filter(a => a.city.toLowerCase().includes(from.toLowerCase()) || a.code.toLowerCase().includes(from.toLowerCase())).map(a => (
                <div key={a.code} className="px-3 py-2 hover:bg-orange-100 cursor-pointer" onClick={() => { setFrom(a.code); setShowFromSuggestions(false); }}>
                  {a.city} ({a.code}), {a.country}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="City or Airport"
            value={to}
            onChange={e => { setTo(e.target.value); setShowToSuggestions(true); }}
            onFocus={() => setShowToSuggestions(true)}
            onBlur={() => setTimeout(() => setShowToSuggestions(false), 100)}
            className="border rounded px-3 py-2 w-full"
          />
          {showToSuggestions && (
            <div className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow">
              {AIRPORTS.filter(a => a.city.toLowerCase().includes(to.toLowerCase()) || a.code.toLowerCase().includes(to.toLowerCase())).map(a => (
                <div key={a.code} className="px-3 py-2 hover:bg-orange-100 cursor-pointer" onClick={() => { setTo(a.code); setShowToSuggestions(false); }}>
                  {a.city} ({a.code}), {a.country}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="date"
          value={departure}
          onChange={e => setDeparture(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select value={travelers} onChange={e => setTravelers(Number(e.target.value))} className="border rounded px-3 py-2 w-full">
          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <span>Price Range</span>
          <input
            type="range"
            min={0}
            max={5000}
            value={price[1]}
            onChange={e => setPrice([0, Number(e.target.value)])}
            className="w-full accent-orange-500"
          />
          <span>${price[0]}</span>
          <span>to</span>
          <span>${price[1]}</span>
        </div>
        <div className="flex gap-4">
          {CLASSES.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="flightClass"
                value={c}
                checked={flightClass === c}
                onChange={() => setFlightClass(c)}
                className="accent-orange-500"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded transition"
        >
          Search Flights
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {loading && <div className="mt-4">Loading...</div>}
      {results.length > 0 && !loading && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 border">Airline</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Agency</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stops</th>
                <th className="p-2 border">Link</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="p-2 border">{item.airline}</td>
                  <td className="p-2 border">{item.departure}</td>
                  <td className="p-2 border">{item.arrival}</td>
                  <td className="p-2 border">{item.agency}</td>
                  <td className="p-2 border">${item.price}</td>
                  <td className="p-2 border">{item.stops}</td>
                  <td className="p-2 border">
                    {item.bookingUrl ? (
                      <a href={item.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Book</a>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 