// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_ADDRESS = {
  city: 'Monticello',
  country: 'US',
  postalCode: '52310',
  region: 'IA',
  roadNote: 'County Road E16 is the Lower Prairieburg Road.',
  street: '16107 County Road E16',
}

export const SITE_DESCRIPTION =
  'Berean Bible Church - A family of believers in Jesus Christ seeking to honor God through His Word and sharing the Gospel in Monticello, Iowa.'

export const SITE_FACEBOOK_URL = 'https://www.facebook.com/bbcmonticello/'

const SITE_GEO = {
  latitude: 42.2248147,
  longitude: -91.190385,
}

export const SITE_MAPS_URL =
  'https://www.google.com/maps/place/Berean+Bible+Church/@42.2248147,-91.1925737,17z/data=!3m1!4b1!4m5!3m4!1s0x87e36074774e06bd:0xd8e7ca558df6812c!8m2!3d42.2248147!4d-91.190385'

export const SITE_THEME_COLOR = {
  dark: '#7e0e28',
  light: '#f9f9f8',
}

export const SITE_TITLE = 'Berean Bible Church'

export const SITE_WORSHIP = {
  sundayEvening: {
    calendarNote: 'Every Sunday evening (except first Sunday of the month)',
    closes: '19:00',
    dayOfWeek: 'Sunday',
    location: 'Located at the Berean Bible Church building',
    opens: '18:00',
    timeRange: '6:00-7:00 p.m.',
  },
  sundayMorning: {
    calendarNote: 'Every Sunday morning',
    closes: '11:00',
    dayOfWeek: 'Sunday',
    homeStart: '9:30 AM',
    location: 'Located at the Berean Bible Church building',
    opens: '09:30',
    timeRange: '9:30-11:00 a.m.',
  },
}

export function getChurchJsonLd(args: { image: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE_ADDRESS.country,
      addressLocality: SITE_ADDRESS.city,
      addressRegion: SITE_ADDRESS.region,
      postalCode: SITE_ADDRESS.postalCode,
      streetAddress: SITE_ADDRESS.street,
    },
    description: SITE_DESCRIPTION,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
    },
    hasMap: SITE_MAPS_URL,
    image: args.image,
    name: SITE_TITLE,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        closes: SITE_WORSHIP.sundayMorning.closes,
        dayOfWeek: SITE_WORSHIP.sundayMorning.dayOfWeek,
        opens: SITE_WORSHIP.sundayMorning.opens,
      },
    ],
    sameAs: [SITE_FACEBOOK_URL],
    url: args.url,
  }
}
