import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { generateSchemaGraph } from '../../data/schemaGraph'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: string
}

const ROUTE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Nayak Labs — Autonomous Systems & Applied AI Studio',
    description:
      'Nayak Labs is an elite applied AI and software research studio. We build deterministic agent runtimes, high-throughput cloud architectures, and selective engineering fellowships.',
    keywords:
      'Applied AI, Autonomous Systems, AI Studio, Distributed Systems, Software Architecture, AI Engineering Fellowship, Nayak Labs',
  },
  '/products': {
    title: 'Nayak Labs — In-House Platforms & Interactive Runtimes',
    description:
      'Explore proprietary platforms, real-time event mesh runtimes, and autonomous agent infrastructure engineered 100% in-house at Nayak Labs.',
    keywords:
      'AI Products, Event Mesh, Autonomous Runtime, Developer Tools, Agent Frameworks, Nayak Labs Products',
  },
  '/services': {
    title: 'Nayak Labs — Engineering Capabilities & Client Pods',
    description:
      'Dedicated engineering pods delivering custom cloud architectures, bespoke microservices, and production AI deployments with guaranteed SLAs.',
    keywords:
      'Cloud Architecture, AI Consulting, Enterprise Microservices, Engineering Pods, Full Stack Systems, Nayak Labs Services',
  },
  '/academics': {
    title: 'Nayak Labs — Engineering Fellowship & Academy',
    description:
      'A selective 6-week engineering fellowship limited to 12 fellows per cohort. Master systems architecture, distributed runtimes, and production AI under founder mentorship.',
    keywords:
      'Engineering Fellowship, AI Bootcamp, Software Architecture Mentorship, Systems Engineering Cohort, Nayak Labs Academics',
  },
  '/coming-soon': {
    title: 'Nayak Labs — Portal Deploying Soon',
    description:
      'New production runtimes and studio releases deploying soon from Nayak Labs.',
    keywords: 'Nayak Labs, Autonomous Systems, Portal Release',
  },
}

export function SEOHead({ title, description, image = '/NayakLabs.png', type = 'website' }: SEOProps) {
  const { pathname } = useLocation()
  const currentSEO = ROUTE_SEO[pathname] || ROUTE_SEO['/']

  const activeTitle = title || currentSEO.title
  const activeDesc = description || currentSEO.description
  const activeUrl = `https://nayaklabs.com${pathname === '/' ? '' : pathname}`

  useEffect(() => {
    // 1. Document Title
    document.title = activeTitle

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', activeDesc)

    // 3. Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', currentSEO.keywords)

    // 4. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', activeUrl)

    // 5. OpenGraph Tags
    const updateOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    updateOG('og:title', activeTitle)
    updateOG('og:description', activeDesc)
    updateOG('og:url', activeUrl)
    updateOG('og:type', type)
    updateOG('og:image', `https://nayaklabs.com${image}`)
    updateOG('og:site_name', 'Nayak Labs')

    // 6. Twitter Card Tags
    const updateTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    updateTwitter('twitter:card', 'summary_large_image')
    updateTwitter('twitter:title', activeTitle)
    updateTwitter('twitter:description', activeDesc)
    updateTwitter('twitter:image', `https://nayaklabs.com${image}`)
    updateTwitter('twitter:site', '@nayaklabs')

    // 7. Inject JSON-LD Schema.org graph
    let jsonLdScript = document.getElementById('nayaklabs-schema-jsonld')
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script')
      jsonLdScript.id = 'nayaklabs-schema-jsonld'
      jsonLdScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(jsonLdScript)
    }
    jsonLdScript.textContent = JSON.stringify(generateSchemaGraph(pathname))
  }, [activeTitle, activeDesc, activeUrl, image, pathname, type, currentSEO.keywords])

  return null
}
