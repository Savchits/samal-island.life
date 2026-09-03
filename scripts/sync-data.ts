import fs from 'node:fs';
import path from 'node:path';

// Load single source of truth files
const roomsPath = path.resolve(process.cwd(), 'data/rooms.json');
const pricingPath = path.resolve(process.cwd(), 'data/pricing.json');
const metaPath = path.resolve(process.cwd(), 'data/resort_meta.json');

export interface RoomData {
  id: string;
  schemaId: string;
  name: string;
  category: string;
  areaSqm: number;
  status: 'available' | 'occupied';
  pricePerNight: number;
  pricePerMonth: number;
  bedType: string;
  occupancy: number;
  badge: string;
  view: string;
  noiseLevel: string;
  workstation: {
    desk: string;
    chair: string;
    display: string;
    network: string;
  };
  amenities: string[];
  images: string[];
}

export interface PricingData {
  updatedAt: string;
  currency: string;
  priceRange: {
    nightly: { min: number; max: number; display: string };
    monthly: { min: number; max: number; display: string };
  };
  plans: Array<{
    id: string;
    name: string;
    billingCycle: string;
    priceRange: string;
    inclusions: string[];
  }>;
}

export function loadData() {
  const roomsJson = JSON.parse(fs.readFileSync(roomsPath, 'utf-8'));
  const pricingJson: PricingData = JSON.parse(fs.readFileSync(pricingPath, 'utf-8'));
  const metaJson = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

  return {
    rooms: roomsJson.rooms as RoomData[],
    availableCount: roomsJson.availableCount as number,
    occupiedCount: roomsJson.occupiedCount as number,
    totalRoomsCount: roomsJson.totalRoomsCount as number,
    pricing: pricingJson,
    meta: metaJson
  };
}

/**
 * Generates unified Schema.org JSON-LD graph guaranteed to match HTML
 */
export function generateUnifiedJsonLd() {
  const { rooms, pricing, meta } = loadData();

  const resortNode = {
    "@type": ["Resort", "LodgingBusiness"],
    "@id": `${meta.url}#resort`,
    "name": meta.name,
    "alternateName": meta.alternateName,
    "description": "Autonomous coliving and workspace resort on Samal Island, Philippines (elevation 265m), offering Starlink internet up to 350 Mbps, 10kW solar power, 18,000L purified water reserves, and 3-year legal residency with 0% personal tax on foreign income.",
    "url": meta.url,
    "telephone": meta.phone,
    "email": meta.email,
    "priceRange": `${pricing.priceRange.nightly.display}, ${pricing.priceRange.monthly.display}`,
    "checkinTime": "14:00",
    "checkoutTime": "11:00",
    "dateModified": new Date().toISOString().split('T')[0],
    "address": {
      "@type": "PostalAddress",
      ...meta.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      ...meta.geo
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      ...meta.aggregateRating
    }
  };

  const roomNodes = rooms.map(room => ({
    "@type": "HotelRoom",
    "@id": room.schemaId,
    "name": room.name,
    "description": `${room.category}, ${room.areaSqm} sqm. Equipped with ${room.workstation.desk}, ${room.workstation.chair}, and ${room.workstation.network}.`,
    "bed": {
      "@type": "BedDetails",
      "numberOfBeds": 1,
      "typeOfBed": room.bedType
    },
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": room.occupancy,
      "unitCode": "C62"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": room.areaSqm,
      "unitCode": "MTK"
    },
    "amenityFeature": room.amenities.map(a => ({
      "@type": "LocationFeatureSpecification",
      "name": a,
      "value": true
    })),
    "offers": {
      "@type": "Offer",
      "price": room.pricePerMonth,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": room.pricePerMonth,
        "priceCurrency": "USD",
        "unitCode": "MON"
      },
      "availability": room.status === 'available' ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      "url": `${meta.url}#rooms`
    }
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [resortNode, ...roomNodes]
  };
}

// When executed directly, outputs status
if (process.argv[1] && process.argv[1].endsWith('sync-data.ts')) {
  const jsonLd = generateUnifiedJsonLd();
  console.log('Successfully generated synchronized JSON-LD from data/rooms.json and data/pricing.json.');
  console.log(`Total rooms synced: ${jsonLd['@graph'].length - 1}`);
}
