import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'AT Dental'
const BASE_URL = 'https://atdental.ma'
const DEFAULT_IMAGE = `${BASE_URL}/images/logo.png`

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AT Dental',
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+212693373489',
    contactType: 'customer service',
    availableLanguage: ['French', 'Arabic'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '187, Lotissement Safsaf',
    addressLocality: 'Marrakech',
    addressCountry: 'MA',
  },
  sameAs: [],
}

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'AT Dental',
  description: 'Distribution de fournitures et équipements dentaires de haute qualité au Maroc.',
  url: BASE_URL,
  telephone: '+212693373489',
  email: 'atdental2024@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '187, Lotissement Safsaf',
    addressLocality: 'Marrakech',
    addressRegion: 'Marrakech-Safi',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '31.6295',
    longitude: '-7.9811',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
  currenciesAccepted: 'MAD',
  paymentAccepted: 'Cash, Bank Transfer',
  areaServed: {
    '@type': 'Country',
    name: 'Morocco',
  },
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schema,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Fournitures & Équipements Dentaires au Maroc`
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL
  const image = ogImage || DEFAULT_IMAGE

  const extra = Array.isArray(schema) ? schema : schema ? [schema] : []
  const schemas = [ORG_SCHEMA, LOCAL_BUSINESS_SCHEMA, ...extra].filter(Boolean)

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_MA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
