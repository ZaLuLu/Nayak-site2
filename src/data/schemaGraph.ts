/**
 * Schema.org JSON-LD Structured Data Graph for Nayak Labs
 * Built using SE Ranking SEO/GEO production standards.
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://nayaklabs.com/#organization',
  name: 'Nayak Labs',
  alternateName: ['NayakLabs', 'Nayak Labs Studio'],
  url: 'https://nayaklabs.com',
  logo: 'https://nayaklabs.com/NayakLabs.png',
  description:
    'Applied AI & Autonomous Systems Research and Architecture Studio. Building deterministic agent runtimes, high-throughput distributed systems, and selective engineering fellowships.',
  sameAs: [
    'https://twitter.com/nayaklabs',
    'https://github.com/nayaklabs',
    'https://linkedin.com/company/nayaklabs',
    'https://instagram.com/nayaklabs',
  ],
  founder: {
    '@type': 'Person',
    name: 'Nayak Labs Founders',
  },
  knowsAbout: [
    'Autonomous AI Systems',
    'Distributed Cloud Architecture',
    'Deterministic Agent Runtimes',
    'High-Velocity Full-Stack Engineering',
    'Advanced Engineering Fellowships',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://nayaklabs.com/#website',
  url: 'https://nayaklabs.com',
  name: 'Nayak Labs',
  description: 'Autonomous Systems & Applied AI Studio — In-House Platforms, Engineering Pods & Academy.',
  publisher: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  inLanguage: 'en-US',
}

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://nayaklabs.com/services#service',
  name: 'Autonomous Systems & Applied AI Engineering Services',
  provider: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  serviceType: 'Software Engineering & AI Architecture',
  description:
    'Bespoke engineering pods delivering production-grade microservices, high-throughput event streaming, and custom AI agent workflows with guaranteed performance SLAs.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering Capabilities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Distributed Systems & Cloud Architecture',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Applied AI & Multi-Agent Runtimes',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Velocity MVP to Enterprise Pods',
        },
      },
    ],
  },
}

export const academicsSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalProgram',
  '@id': 'https://nayaklabs.com/academics#program',
  name: 'Nayak Labs Engineering Fellowship',
  description:
    'An intensive 6-week engineering residency focused on systems architecture, production AI deployment, and distributed systems. Capped at 12 fellows per cohort.',
  provider: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  timeToComplete: 'P6W',
  occupationalCategory: 'Software Engineer / AI Systems Architect',
  educationalCredentialAwarded: 'Nayak Labs Fellowship Certification & Studio Alumni Network',
  programPrerequisites: 'Proficiency in data structures, algorithms, and core systems programming.',
}

export function generateSchemaGraph(pathname: string) {
  const schemas: object[] = [organizationSchema, websiteSchema]

  if (pathname === '/services') {
    schemas.push(servicesSchema)
  } else if (pathname === '/academics') {
    schemas.push(academicsSchema)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}
