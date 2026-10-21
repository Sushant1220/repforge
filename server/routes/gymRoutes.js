const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Haversine formula for calculating distance in km between two lat/lng points
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
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

// Helper to query OpenStreetMap / Overpass API with expanding radius (5km -> 10km -> 20km)
async function fetchOverpassGyms(lat, lng) {
  const radiiToTry = [5000, 10000, 20000]; // 5 km, 10 km, 20 km
  let elements = [];

  for (const radiusMeters of radiiToTry) {
    const query = `[out:json][timeout:20];
(
  node["leisure"="fitness_centre"](around:${radiusMeters},${lat},${lng});
  way["leisure"="fitness_centre"](around:${radiusMeters},${lat},${lng});
  node["leisure"="fitness_station"](around:${radiusMeters},${lat},${lng});
  way["leisure"="fitness_station"](around:${radiusMeters},${lat},${lng});
  node["sport"="fitness"](around:${radiusMeters},${lat},${lng});
  way["sport"="fitness"](around:${radiusMeters},${lat},${lng});
  node["amenity"="gym"](around:${radiusMeters},${lat},${lng});
  way["amenity"="gym"](around:${radiusMeters},${lat},${lng});
);
out center 40;`;

    try {
      let response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query)
      });

      if (!response.ok) {
        // Backup mirror if main overpass server is busy
        response = await fetch('https://overpass.kumi.systems/api/interpreter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(query)
        });
      }

      if (response.ok) {
        const data = await response.json();
        elements = data.elements || [];
        if (elements.length > 0) {
          break; // Found gyms! Stop expanding
        }
      }
    } catch (e) {
      console.warn(`Overpass API server fetch failed at ${radiusMeters}m:`, e.message);
    }
  }

  return elements;
}

function processOverpassElements(elements, userLat, userLng, sortBy = 'Nearest') {
  const results = [];
  const seenNames = new Set();

  for (const item of elements) {
    const itemLat = item.lat || (item.center && item.center.lat);
    const itemLng = item.lon || (item.center && item.center.lon);

    if (!itemLat || !itemLng) continue;

    const tags = item.tags || {};
    let name = (tags.name || tags["name:en"] || tags.brand || tags.operator || "Fitness Center & Gym").trim();
    
    // Deduplicate by name and lat/lng
    const nameKey = name.toLowerCase() + "_" + itemLat.toFixed(3) + "_" + itemLng.toFixed(3);
    if (seenNames.has(nameKey)) continue;
    seenNames.add(nameKey);

    const distanceKm = calculateDistanceKm(userLat, userLng, itemLat, itemLng);

    // Strictly enforce max 20 km distance
    if (distanceKm > 20.0) continue;

    const street = tags["addr:street"] || tags["addr:suburb"] || tags["addr:district"] || "";
    const city = tags["addr:city"] || tags["addr:town"] || "";
    let address = [street, city].filter(Boolean).join(", ");
    if (!address) {
      address = `Near Location (${itemLat.toFixed(4)}, ${itemLng.toFixed(4)})`;
    }

    const numId = typeof item.id === 'number' ? Math.abs(item.id) : 100;
    const rating = +(4.2 + (numId % 8) * 0.1).toFixed(1);
    const reviewCount = 25 + (numId % 300);
    const imgIndex = numId % gymImages.length;

    results.push({
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
      priceMonthly: 1800 + (numId % 12) * 100
    });
  }

  // Sort by distance ascending by default (closest first)
  if (sortBy === 'Highest Rated') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'Most Reviewed') {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  } else {
    // Nearest first
    results.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return results;
}

// @route GET /api/gyms/nearby
router.get('/nearby', protect, async (req, res) => {
  try {
    const userLat = parseFloat(req.query.lat);
    const userLng = parseFloat(req.query.lng);
    const sortBy = req.query.sort || 'Nearest';

    if (!userLat || !userLng || isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({
        message: 'Valid user latitude and longitude are required.',
        gyms: []
      });
    }

    const elements = await fetchOverpassGyms(userLat, userLng);
    const gyms = processOverpassElements(elements, userLat, userLng, sortBy);

    res.json({
      userLocation: { lat: userLat, lng: userLng },
      totalGymsFound: gyms.length,
      gyms: gyms
    });
  } catch (error) {
    console.error('Fetch nearby gyms backend error:', error);
    res.status(500).json({ message: 'Unable to load nearby gyms. Please try again.', gyms: [] });
  }
});

module.exports = router;
