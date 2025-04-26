import { useState } from "react";
import { VendorCard } from "../Cards/vendor-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button, Input } from "../../../../../Layout/combined-ui";
import { mockOrganizers } from "../../../../../functions/mockData";
import { Loc } from "../../../../../functions/accsEventsCollections";

const Explore: React.FC = () => {
  const [visibleVendors, setVisibleVendors] = useState(6)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortCriteria, setSortCriteria] = useState("price")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({})

  const formatLocation = (location: Loc): string => {
    if (!location) return "Unknown Location"
    return `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`
  }

  const allVendors = [
    ...mockOrganizers.map((organizer) => ({
      id: organizer.organizerId,
      name: organizer.organizationName,
      location: formatLocation(organizer.address),
      price: organizer.price,
      ratings: organizer.rating || 0,
      image: organizer.image || "/images/vendor.jpg",
      timeSlot: organizer.timeSlot.length ? organizer.timeSlot.join(", ") : "No time slots available",
      type: "organizer",
    })),
 
    ...bookings.map((booking) => ({
      id: booking.id,
      name: booking.name,
      location: booking.location,
      price: booking.price,
      ratings: booking.ratings,
      image: booking.image,
      timeSlot: booking.timeSlot,
      type: "booking",
    })),
    ...packages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      location: pkg.location,
      price: pkg.price,
      ratings: pkg.ratings,
      image: pkg.image,
      timeSlot: pkg.timeSlot,
      type: "package",
    })),
  ]

  // Apply sorting and filtering
  const filteredVendors = allVendors
    .filter((vendor) => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let valueA, valueB

      switch (sortCriteria) {
        case "price":
          valueA = a.price
          valueB = b.price
          break
        case "rating":
          valueA = a.ratings
          valueB = b.ratings
          break
        case "location":
          valueA = a.location.toLowerCase()
          valueB = b.location.toLowerCase()
          return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        default:
          return 0
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA
    })

  // Toggle favorite state for vendors
  const handleToggleFavorite = (id: number, type: string) => {
    setFavorites((prev) => ({
      ...prev,
      [`${type}-${id}`]: !prev[`${type}-${id}`], // Unique key per type
    }))
  }

  const handleSeeMore = () => {
    setVisibleVendors((prev) => prev + 6)
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search for Vendors..."
            className="pl-10 bg-gray-100 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-gray-100 border-none">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            className="bg-gray-100 border-none"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            Sort
          </Button>

          {/* Sort dropdown menu */}
          {showSortDropdown && (
            <div className="absolute right-0 mt-32 w-48 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <div className="px-4 py-2 text-sm font-medium border-b">Sort by</div>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortCriteria === "price" && sortOrder === "asc" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortCriteria("price")
                    setSortOrder("asc")
                    setShowSortDropdown(false)
                  }}
                >
                  Price: Low to High
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortCriteria === "price" && sortOrder === "desc" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortCriteria("price")
                    setSortOrder("desc")
                    setShowSortDropdown(false)
                  }}
                >
                  Price: High to Low
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortCriteria === "rating" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortCriteria("rating")
                    setSortOrder("desc")
                    setShowSortDropdown(false)
                  }}
                >
                  Rating
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortCriteria === "location" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortCriteria("location")
                    setSortOrder("asc")
                    setShowSortDropdown(false)
                  }}
                >
                  Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.slice(0, visibleVendors).map((vendor) => (
          <VendorCard
            key={`${vendor.type}-${vendor.id}`}
            id={vendor.id}
            name={vendor.name}
            location={vendor.location}
            price={vendor.price}
            ratings={vendor.ratings}
            image={vendor.image}
            timeSlot={vendor.timeSlot}
            isFavorite={!!favorites[`${vendor.type}-${vendor.id}`]}
            onToggleFavorite={() => handleToggleFavorite(vendor.id, vendor.type)}
            showHireButton={true}
          />
        ))}
      </div>

      {/* See More Button */}
      {visibleVendors < filteredVendors.length && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleSeeMore}
            className="px-8 py-2 border border-gray-300 rounded-md"
          >
            See More
          </Button>
        </div>
      )}
    </div>
  )
};

const bookings = [
  {
    id: 1,
    name: "Corporate Gala Night",
    category: "Corporate Event",
    location: "Makati Ballroom",
    timeSlot: "07:00 PM - 11:00 PM",
    price: 15000,
    ratings: 30,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Beach Wedding",
    category: "Wedding",
    location: "Boracay Beachfront",
    timeSlot: "04:00 PM - 10:00 PM",
    price: 20000,
    ratings: 40,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Birthday Party",
    category: "Birthday",
    location: "Quezon City",
    timeSlot: "02:00 PM - 06:00 PM",
    price: 8000,
    ratings: 15,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
];

const packages = [
  {
    id: 11,
    name: "Silver Wedding Package",
    category: "Wedding Package",
    location: "Tagaytay",
    timeSlot: "Full-Day Service",
    price: 50000,
    ratings: 15,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
  {
    id: 21,
    name: "Corporate VIP Package",
    category: "Corporate Event",
    location: "BGC",
    timeSlot: "Full-Day Service",
    price: 80000,
    ratings: 20,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
  {
    id: 31,
    name: "Birthday Bash Package",
    category: "Birthday Package",
    location: "Quezon City",
    timeSlot: "Half-Day Service",
    price: 20000,
    ratings: 10,
    image: "/images/vendor.jpg",
    isFavorite: false,
  },
];

export default Explore;