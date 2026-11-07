import { defaultGymSettings } from './defaultData';

export const siteConfig = {
  name: 'Off The Grid Gym | Ropar, Punjab',
  shortName: 'Off The Grid Gym',
  description:
    'Off The Grid Gym is Ropar’s premier athletic training facility in Bal Sanda, Rupnagar. Featuring heavy-duty biomechanical machines, Olympic free weights, dedicated cardio deck, and certified personal coaches.',
  url: 'https://offthegridgymropar.in',
  ogImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&h=630&q=80',
  address: {
    streetAddress: 'Bal Sanda, Bela Road',
    addressLocality: 'Rupnagar (Ropar)',
    addressRegion: 'Punjab',
    postalCode: '140001',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 30.9527996,
    longitude: 76.522236,
  },
  keywords: [
    'Gym in Ropar',
    'Gym in Rupnagar',
    'Best gym in Ropar',
    'Fitness center in Ropar',
    'Unisex gym in Bal Sanda Ropar',
    'Gym membership fees in Ropar',
    'Bodybuilding gym Ropar',
    'Weight training Rupnagar',
    'Personal trainer in Ropar',
    'Off The Grid Gym Ropar',
  ],
};

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ExerciseGym', 'SportsActivityLocation', 'LocalBusiness'],
    '@id': `${siteConfig.url}/#gym`,
    name: defaultGymSettings.gym_name,
    alternateName: ['Off The Grid Gym Ropar', 'OTG Gym Ropar'],
    description: defaultGymSettings.short_description,
    url: siteConfig.url,
    telephone: defaultGymSettings.phone_number,
    priceRange: '₹₹ (₹1,600 - ₹13,500)',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Bank Transfer',
    image: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: defaultGymSettings.address,
      addressLocality: defaultGymSettings.city,
      addressRegion: defaultGymSettings.state,
      postalCode: defaultGymSettings.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: defaultGymSettings.google_maps_url,
    sameAs: [
      defaultGymSettings.instagram_url,
      'https://maps.app.goo.gl/uo77vpVSZ1UDW9Pp6',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '05:30',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '05:30',
        closes: '21:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '07:00',
        closes: '13:00',
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Heavy Free Weights & Power Racks',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Cardio Deck & Endurance Machines',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Certified Personal Trainers',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Locker & Changing Rooms',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Functional Conditioning Turf',
        value: true,
      },
    ],
  };
}

