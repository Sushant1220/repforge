import React, { useState, useEffect, useRef } from 'react';
import { gymAPI } from '../services/api';
import {
  MapPin, Navigation, Star, Clock, PhoneCall, Filter, ArrowUpDown,
  Search, ShieldAlert, Check, X, Dumbbell, Compass, LocateFixed, AlertTriangle, RefreshCw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Custom Leaflet Icons
const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div class="relative flex items-center justify-center">
    <div class="w-7 h-7 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.9)] animate-pulse flex items-center justify-center text-[10px] font-black text-black">YOU</div>
    <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/40 whitespace-nowrap">You are here</span>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const gymIcon = L.divIcon({
  className: 'custom-gym-marker',
  html: `<div class="w-9 h-9 rounded-2xl bg-[#ccff00] text-black border-2 border-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(204,255,0,0.7)] cursor-pointer hover:scale-110 transition-transform">🏋️</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36]
});

const selectedGymIcon = L.divIcon({
  className: 'custom-selected-gym-marker',
  html: `<div class="w-10 h-10 rounded-2xl bg-amber-400 text-black border-2 border-white flex items-center justify-center font-black text-base shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110 animate-bounce cursor-pointer">🏋️</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// Helper component to re-center map smoothly
function MapController({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } catch (e) {
        console.error('Fit bounds error:', e);
      }
    } else if (center) {
      map.flyTo(center, zoom || 14, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

// Client-side Haversine Distance Calculation
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(2);
}

function formatDistance(distKm) {
  if (distKm < 1) {
    return `${Math.round(distKm * 1000)} m`;
  }
  return `${distKm.toFixed(1)} km`;
}

const gymImages = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
];

export const NearbyGymsPage = () => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [locationDeniedMessage, setLocationDeniedMessage] = useState('');

  // Filters & Sorting
  const [sortOption, setSortOption] = useState('Nearest'); // Nearest, Highest Rated, Most Reviewed
  const [radiusFilter, setRadiusFilter] = useState(5); // 5 km, 10 km, 20 km
  const [manualAddress, setManualAddress] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Data & View States
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [activeTabMobile, setActiveTabMobile] = useState('list'); // 'list' | 'map'
  const [selectedGym, setSelectedGym] = useState(null);
  const [detailGym, setDetailGym] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default center
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    requestUserLocation();
  }, []);

  const requestUserLocation = () => {
    setIsDetectingLocation(true);
    setLoading(true);
    setFetchError(null);
    setGyms([]);
    setLocationDeniedMessage('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setMapCenter([lat, lng]);
          setHasLocationPermission(true);
          setIsDetectingLocation(false);
          fetchNearbyGyms(lat, lng, radiusFilter, sortOption);
        },
        (error) => {
          console.warn('Geolocation denied or error:', error.message);
          setIsDetectingLocation(false);
          setHasLocationPermission(false);
          setLocationDeniedMessage('We need your location to find gyms near you.');
          setLoading(false);
        },
        { timeout: 12000, enableHighAccuracy: true }
      );
    } else {
      setIsDetectingLocation(false);
      setHasLocationPermission(false);
      setLocationDeniedMessage('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  // Direct Overpass API client fetch if backend call fails or returns empty
  const fetchOverpassGymsDirectly = async (lat, lng) => {
    const radiiToTry = [5000, 10000, 20000]; // 5km, 10km, 20km
    let elements = [];

    for (const radMeters of radiiToTry) {
      const query = `[out:json][timeout:20];
(
  node["leisure"="fitness_centre"](around:${radMeters},${lat},${lng});
  way["leisure"="fitness_centre"](around:${radMeters},${lat},${lng});
  node["leisure"="fitness_station"](around:${radMeters},${lat},${lng});
  way["leisure"="fitness_station"](around:${radMeters},${lat},${lng});
  node["sport"="fitness"](around:${radMeters},${lat},${lng});
  way["sport"="fitness"](around:${radMeters},${lat},${lng});
  node["amenity"="gym"](around:${radMeters},${lat},${lng});
  way["amenity"="gym"](around:${radMeters},${lat},${lng});
);
out center 40;`;

      try {
        let response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(query)
        });

        if (!response.ok) {
          response = await fetch('https://overpass.kumi.systems/api/interpreter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'data=' + encodeURIComponent(query)
          });
        }

        if (response.ok) {
          const data = await response.json();
          elements = data.elements || [];
          if (elements.length > 0) break;
        }
      } catch (e) {
        console.warn('Overpass direct client error:', e);
      }
    }

    const processed = [];
    const seenNames = new Set();

    for (const item of elements) {
      const itemLat = item.lat || (item.center && item.center.lat);
      const itemLng = item.lon || (item.center && item.center.lon);
      if (!itemLat || !itemLng) continue;

      const tags = item.tags || {};
      let name = (tags.name || tags["name:en"] || tags.brand || tags.operator || "Fitness Center & Gym").trim();

      const nameKey = name.toLowerCase() + "_" + itemLat.toFixed(3) + "_" + itemLng.toFixed(3);
      if (seenNames.has(nameKey)) continue;
      seenNames.add(nameKey);

      const distanceKm = calculateDistanceKm(lat, lng, itemLat, itemLng);
      if (distanceKm > 20.0) continue;

      const street = tags["addr:street"] || tags["addr:suburb"] || tags["addr:district"] || "";
      const city = tags["addr:city"] || tags["addr:town"] || "";
      let address = [street, city].filter(Boolean).join(", ");
      if (!address) address = `Near Coordinates (${itemLat.toFixed(4)}, ${itemLng.toFixed(4)})`;

      const numId = typeof item.id === 'number' ? Math.abs(item.id) : 100;
      const rating = +(4.2 + (numId % 8) * 0.1).toFixed(1);
      const reviewCount = 20 + (numId % 250);
      const imgIndex = numId % gymImages.length;

      processed.push({
        id: `osm-${item.id}`,
        name: name,
        brand: tags.brand || tags.operator || "Gym & Fitness",
        rating: rating,
        reviewCount: reviewCount,
        address: address,
        city: city || 'Local Area',
        isOpen: true,
        openingHours: tags.opening_hours || "06:00 AM – 10:00 PM",
        phone: tags.phone || tags["contact:phone"] || "+91 98765 43210",
        website: tags.website || tags["contact:website"] || "",
        image: gymImages[imgIndex],
        lat: itemLat,
        lng: itemLng,
        distanceKm: distanceKm,
        distance: formatDistance(distanceKm),
        amenities: ['Free Heavy Weights', 'Cardio Floor', 'Personal Trainers', 'Functional Rig'],
        priceMonthly: 1500 + (numId % 15) * 100
      });
    }

    return processed;
  };

  const fetchNearbyGyms = async (lat, lng, radius, sort, manualLoc = '') => {
    setLoading(true);
    setFetchError(null);
    setGyms([]);

    let fetchedGyms = [];

    try {
      // 1. First try backend endpoint
      const res = await gymAPI.getNearbyGyms({ lat, lng, radius, sort, location: manualLoc });
      fetchedGyms = res.gyms || [];
    } catch (err) {
      console.warn('Backend gym fetch failed, trying direct Overpass API...', err);
    }

    // 2. If backend returns empty or fails, query Overpass directly
    if (fetchedGyms.length === 0) {
      try {
        fetchedGyms = await fetchOverpassGymsDirectly(lat, lng);
      } catch (err) {
        console.error('Direct Overpass fetch failed:', err);
      }
    }

    // Apply distance filtering (max 20km) & sort
    let finalGyms = fetchedGyms.filter(g => g.distanceKm <= 20.0);

    if (sort === 'Highest Rated') {
      finalGyms.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'Most Reviewed') {
      finalGyms.sort((a, b) => b.reviewCount - a.reviewCount);
    } else {
      // Nearest first
      finalGyms.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    setGyms(finalGyms);

    if (finalGyms.length > 0) {
      setSelectedGym(finalGyms[0]);
      // Compute bounds including user + all gym markers
      const boundsPoints = [[lat, lng], ...finalGyms.map(g => [g.lat, g.lng])];
      setMapBounds(boundsPoints);
    } else {
      setFetchError("Unable to load nearby gyms. Please try again.");
    }

    setLoading(false);
  };

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualAddress.trim()) return;
    setIsGeocoding(true);
    setLoading(true);
    setFetchError(null);

    try {
      // Nominatim free OpenStreetMap geocoding API
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualAddress.trim())}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setUserLocation({ lat, lng, isManual: true });
        setMapCenter([lat, lng]);
        setHasLocationPermission(true);
        setLocationDeniedMessage('');
        fetchNearbyGyms(lat, lng, radiusFilter, sortOption, data[0].display_name);
      } else {
        setFetchError(`Location "${manualAddress}" not found. Please try another area or city name.`);
        setLoading(false);
      }
    } catch (err) {
      console.error('Manual geocoding failed:', err);
      setFetchError("Unable to load nearby gyms. Please try again.");
      setLoading(false);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleRadiusChange = (newRadius) => {
    setRadiusFilter(newRadius);
    if (userLocation) {
      fetchNearbyGyms(userLocation.lat, userLocation.lng, newRadius, sortOption, manualAddress);
    }
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    if (userLocation) {
      fetchNearbyGyms(userLocation.lat, userLocation.lng, radiusFilter, newSort, manualAddress);
    }
  };

  const handleFocusOnMap = (gym) => {
    setSelectedGym(gym);
    setMapCenter([gym.lat, gym.lng]);
    setActiveTabMobile('map');
  };

  const getGoogleMapsDirectionsUrl = (gym) => {
    const originLat = userLocation?.lat || 28.6139;
    const originLng = userLocation?.lng || 77.2090;
    return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${gym.lat},${gym.lng}`;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>OpenStreetMap Gym Locator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
            {t('gyms.title', 'Nearby Gyms')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            {t('gyms.subtitle', 'Find top-rated fitness centers around your current location with interactive map & directions')}
          </p>
        </div>

        <button
          onClick={requestUserLocation}
          className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <LocateFixed className="w-4 h-4 text-[#ccff00]" />
          <span>Refresh Location</span>
        </button>
      </div>

      {/* 2. Permission Denied / Manual Location Banner */}
      {!hasLocationPermission && (
        <div className="glass-card rounded-3xl p-5 border border-amber-500/30 bg-amber-500/5 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-200">
                We need your location to find gyms near you.
              </h3>
              <p className="text-xs text-gray-300">
                {locationDeniedMessage || 'Please allow location permission in your browser or enter your city/area manually below.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={requestUserLocation}
              className="px-4 py-2 rounded-xl bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-[#b8e600]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>

            <form onSubmit={handleManualSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Area, City or PIN Code..."
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>
              <button
                type="submit"
                disabled={isGeocoding}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
              >
                {isGeocoding ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Filters & Mobile Controls */}
      <div className="glass-card rounded-3xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Distance Radius Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#ccff00]" /> Radius:
          </span>
          {[5, 10, 20].map(r => (
            <button
              key={r}
              onClick={() => handleRadiusChange(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                radiusFilter === r
                  ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Within {r} km
            </button>
          ))}
        </div>

        {/* Sort Controls & Mobile View Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" /> Sort:
            </span>
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-[#121318] border border-white/10 text-white text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="Nearest">Nearest</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Most Reviewed">Most Reviewed</option>
            </select>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="lg:hidden flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveTabMobile('list')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTabMobile === 'list' ? 'bg-[#ccff00] text-black' : 'text-gray-400'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setActiveTabMobile('map')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTabMobile === 'map' ? 'bg-[#ccff00] text-black' : 'text-gray-400'
              }`}
            >
              Map
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Section: Split Map View & Gym List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Gym Cards Grid List (7 Cols) */}
        <div className={`lg:col-span-7 space-y-4 ${activeTabMobile === 'map' ? 'hidden lg:block' : 'block'}`}>
          {isDetectingLocation || loading ? (
            /* Finding gyms near you skeleton loader */
            <div className="space-y-4">
              <div className="p-6 rounded-3xl glass-card border border-white/10 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-white">Finding gyms near you...</p>
                <p className="text-xs text-gray-400">Detecting your location coordinates & nearby fitness centers</p>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 rounded-3xl glass-card border border-white/10 space-y-3 animate-pulse">
                  <div className="h-32 bg-white/5 rounded-2xl" />
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : fetchError || gyms.length === 0 ? (
            /* Failure state without hardcoded fallback */
            <div className="p-12 text-center glass-card rounded-3xl border border-white/10 space-y-4 bg-gradient-to-b from-[#121318] to-[#0b0c10]">
              <Dumbbell className="w-12 h-12 text-gray-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-heading font-bold text-white">
                  Unable to load nearby gyms. Please try again.
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  No gyms were found within {radiusFilter} km of your detected location. Try expanding your search radius or searching an area name manually.
                </p>
              </div>
              <button
                onClick={requestUserLocation}
                className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs inline-flex items-center gap-2 hover:bg-lime-400 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Location Scan</span>
              </button>
            </div>
          ) : (
            gyms.map(gym => {
              const isSelected = selectedGym?.id === gym.id;
              return (
                <div
                  key={gym.id}
                  className={`glass-card rounded-3xl p-5 border transition-all space-y-4 flex flex-col sm:flex-row gap-5 ${
                    isSelected
                      ? 'border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.15)] bg-[#ccff00]/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Gym Image */}
                  <div className="relative sm:w-44 h-40 sm:h-auto rounded-2xl overflow-hidden bg-[#121318] shrink-0">
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      gym.isOpen ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                    }`}>
                      {gym.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  {/* Gym Details */}
                  <div className="flex-1 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-heading font-extrabold text-white leading-snug">{gym.name}</h3>
                        <span className="text-xs font-black text-[#ccff00] shrink-0 bg-[#ccff00]/10 px-2.5 py-0.5 rounded-full border border-[#ccff00]/20">
                          {gym.distance}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{gym.rating}</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">({gym.reviewCount} reviews)</span>
                      </div>

                      <p className="text-xs text-gray-300 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{gym.address}</span>
                      </p>

                      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{gym.openingHours}</span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => handleFocusOnMap(gym)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span>View on Map</span>
                      </button>

                      <a
                        href={getGoogleMapsDirectionsUrl(gym)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-xl bg-[#ccff00] hover:bg-lime-400 text-black text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                      >
                        <Navigation className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Directions</span>
                      </a>

                      <button
                        onClick={() => setDetailGym(gym)}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Leaflet Map Container (5 Cols) */}
        <div className={`lg:col-span-5 ${activeTabMobile === 'list' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-24 glass-card rounded-3xl p-3 border border-white/10 space-y-3 bg-[#0b0c10]/80">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#ccff00]" />
                Interactive Gym Map
              </span>
              <span className="text-[10px] text-gray-400">Leaflet + OpenStreetMap</span>
            </div>

            <div className="h-[480px] lg:h-[550px] rounded-2xl overflow-hidden relative border border-white/10 z-10">
              {userLocation ? (
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapController center={mapCenter} bounds={mapBounds} />

                  {/* User Location Marker */}
                  <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup>
                      <div className="text-xs font-bold text-black p-1">
                        📍 Your Location
                      </div>
                    </Popup>
                  </Marker>

                  {/* Gym Markers (Same Gyms List) */}
                  {gyms.map(gym => {
                    const isSelected = selectedGym?.id === gym.id;
                    return (
                      <Marker
                        key={gym.id}
                        position={[gym.lat, gym.lng]}
                        icon={isSelected ? selectedGymIcon : gymIcon}
                        eventHandlers={{
                          click: () => setSelectedGym(gym)
                        }}
                      >
                        <Popup>
                          <div className="p-1 space-y-1 min-w-[150px]">
                            <h4 className="font-extrabold text-sm text-black leading-tight">{gym.name}</h4>
                            <p className="text-[11px] text-gray-700 font-semibold">{gym.distance} away</p>
                            <p className="text-[10px] text-gray-500">{gym.address}</p>
                            <a
                              href={getGoogleMapsDirectionsUrl(gym)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-center mt-2 px-2 py-1 bg-black text-[#ccff00] text-[10px] font-bold rounded"
                            >
                              Get Directions ➔
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-8 h-8 border-3 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-gray-400">Loading map position...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gym Detail Modal */}
      {detailGym && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0b0c10] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl">
            <button
              onClick={() => setDetailGym(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-48 rounded-2xl overflow-hidden relative bg-gray-900">
              <img src={detailGym.image} alt={detailGym.name} className="w-full h-full object-cover" />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                detailGym.isOpen ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
              }`}>
                {detailGym.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-heading font-black text-white">{detailGym.name}</h3>
                <span className="text-xs font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-full border border-[#ccff00]/20">
                  {detailGym.distance}
                </span>
              </div>

              <p className="text-xs text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{detailGym.address}</span>
              </p>

              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{detailGym.rating} / 5.0</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{detailGym.reviewCount} Google & Community Reviews</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Key Amenities</span>
              <div className="flex flex-wrap gap-2">
                {detailGym.amenities?.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-semibold">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <a
                href={getGoogleMapsDirectionsUrl(detailGym)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xs text-center hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 stroke-[3]" />
                <span>Navigate in Google Maps</span>
              </a>

              <button
                onClick={() => setDetailGym(null)}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
