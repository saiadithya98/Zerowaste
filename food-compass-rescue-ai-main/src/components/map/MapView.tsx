import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { sampleDonations } from "@/data/sampleData";
import { DonationStatus } from "@/types/donations";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Import default marker icon
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Create custom markers based on status
const createCustomMarker = (status: DonationStatus) => {
  let className = "marker-fresh";
  
  if (status === "expiring_soon") {
    className = "marker-expiring";
  } else if (status === "expired") {
    className = "marker-expired";
  }
  
  return L.divIcon({
    className: `custom-marker-icon ${className}`,
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#48972f" width="36" height="36">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  showFilters?: boolean;
}

const MapView = ({ center = [51.505, -0.09], zoom = 13, showFilters = true }: MapViewProps) => {
  const [filters, setFilters] = useState({
    veg: true,
    nonVeg: true,
    fresh: true,
    expiringSoon: true,
    expired: false,
  });
  
  const handleFilterChange = (filterName: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName as keyof typeof prev]
    }));
  };

  const filteredDonations = sampleDonations.filter(donation => {
    if (donation.foodType === "veg" && !filters.veg) return false;
    if (donation.foodType === "non_veg" && !filters.nonVeg) return false;
    if (donation.status === "fresh" && !filters.fresh) return false;
    if (donation.status === "expiring_soon" && !filters.expiringSoon) return false;
    if (donation.status === "expired" && !filters.expired) return false;
    return true;
  });

  return (
    <div className="h-full w-full relative">
      {showFilters && (
        <div className="absolute top-4 right-4 z-20 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-2">Filters</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-veg"
                checked={filters.veg}
                onChange={() => handleFilterChange("veg")}
                className="rounded text-eco-green-500 focus:ring-eco-green-500"
              />
              <label htmlFor="filter-veg" className="text-sm">Vegetarian</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-nonveg"
                checked={filters.nonVeg}
                onChange={() => handleFilterChange("nonVeg")}
                className="rounded text-eco-green-500 focus:ring-eco-green-500"
              />
              <label htmlFor="filter-nonveg" className="text-sm">Non-Vegetarian</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-fresh"
                checked={filters.fresh}
                onChange={() => handleFilterChange("fresh")}
                className="rounded text-eco-green-500 focus:ring-eco-green-500"
              />
              <label htmlFor="filter-fresh" className="text-sm">Fresh</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-expiring"
                checked={filters.expiringSoon}
                onChange={() => handleFilterChange("expiringSoon")}
                className="rounded text-eco-green-500 focus:ring-eco-green-500"
              />
              <label htmlFor="filter-expiring" className="text-sm">Expiring Soon</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-expired"
                checked={filters.expired}
                onChange={() => handleFilterChange("expired")}
                className="rounded text-eco-green-500 focus:ring-eco-green-500"
              />
              <label htmlFor="filter-expired" className="text-sm">Expired</label>
            </div>
          </div>
        </div>
      )}
      
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredDonations.map((donation) => (
          <Marker 
            key={donation.id} 
            position={[donation.location.lat, donation.location.lng]}
            icon={createCustomMarker(donation.status)}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-eco-green-700">{donation.title}</h3>
                <p className="text-sm text-gray-600">{donation.description}</p>
                
                <div className="mt-2 flex items-center text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${
                    donation.foodType === "veg" 
                      ? "bg-eco-green-100 text-eco-green-800" 
                      : "bg-orange-100 text-orange-800"
                  }`}>
                    {donation.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                  </span>
                  
                  <div className="ml-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{donation.pickupWindow}</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs">
                  {donation.status === "fresh" && (
                    <span className="bg-eco-green-100 text-eco-green-800 px-2 py-0.5 rounded-full">
                      Fresh
                    </span>
                  )}
                  {donation.status === "expiring_soon" && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Expiring Soon
                    </span>
                  )}
                </div>
                
                <div className="mt-3">
                  <Button size="sm" className="w-full">
                    Request Pickup
                  </Button>
                  <Link to={`/donation/${donation.id}`} className="text-xs text-eco-green-600 underline mt-1 block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
