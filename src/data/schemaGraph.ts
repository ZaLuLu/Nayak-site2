/**
 * Schema.org JSON-LD Structured Data Graph for Nayak Labs
 * Clean, human-readable structured data for search engines.
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
    'Software engineering studio building developer tools, modern cloud applications, and hands-on technical training.',
  sameAs: [
    'https://instagram.com/nayaklabs.ai',
  ],
  founder: {
    '@type': 'Person',
    name: 'Nayak Labs Founders',
  },
  knowsAbout: [
    'Web Application Development',
    'FastAPI & Python Backends',
    'Next.js & TypeScript Frontends',
    'Event-Driven Systems',
    'PostgreSQL & Cloud Architecture',
    'Software Engineering Mentorship',
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
  description: 'Software Engineering Studio — Developer Tools, Full-Stack Product Engineering & Technical Training.',
  publisher: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  inLanguage: 'en-US',
}

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://nayaklabs.com/services#service',
  name: 'Full-Stack Software Engineering Services',
  provider: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  serviceType: 'Software Development & Systems Architecture',
  description:
    'Dedicated engineering teams building modern web applications, FastAPI backends, Next.js frontends, and reliable cloud infrastructure with 100% client code ownership.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering Capabilities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Modern Web Applications & SaaS Platforms',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'FastAPI Backends & API Infrastructure',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cloud Infrastructure & Database Architecture',
        },
      },
    ],
  },
}

export const productsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://nayaklabs.com/products#list',
  name: 'Developer Tools by Nayak Labs',
  itemListElement: [
    {
      '@type': 'SoftwareApplication',
      name: 'Event Mesh',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description: 'A lightweight, high-performance pub/sub broker for event-driven applications with sub-millisecond dispatch and zero setup complexity.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'DI Notes',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Cross-platform',
      description: 'A distraction-free markdown studio for technical writing, architecture notes, and instant team sharing.',
    },
  ],
}

export const academicsSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalProgram',
  '@id': 'https://nayaklabs.com/academics#program',
  name: 'Nayak Labs Engineering Training',
  description:
    'Practical, hands-on software engineering training focusing on real-world systems architecture, production codebases, and modern backend stacks.',
  provider: {
    '@id': 'https://nayaklabs.com/#organization',
  },
  timeToComplete: 'P6W',
  occupationalCategory: 'Software Engineer',
  educationalCredentialAwarded: 'Nayak Labs Engineering Certificate',
  programPrerequisites: 'Foundations in programming, data structures, and algorithms.',
}

export function generateSchemaGraph(pathname: string) {
  const schemas: object[] = [organizationSchema, websiteSchema]

  if (pathname === '/services') {
    schemas.push(servicesSchema)
  } else if (pathname === '/products') {
    schemas.push(productsSchema)
  } else if (pathname === '/academics') {
    schemas.push(academicsSchema)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}
