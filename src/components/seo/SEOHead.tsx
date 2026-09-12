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
    title: 'Nayak Labs — AI Products, Technical Training & Software Services',
    description:
      'A studio for shipping AI products, training engineers, and building software that keeps teams moving. Three verticals, one obsession with craft.',
    keywords:
      'AI Products, Technical Training, Software Services, Web Development, Automation, Nayak Labs',
  },
  '/products': {
    title: 'Engineered Products & Platforms — Nayak Labs',
    description:
      'High-performance software products engineered for developers and teams. Explore Event Mesh (3D spatial tech event mesh) and DI Notes (interactive execution runtime).',
    keywords:
      'AI Products, DI Notes, Event Mesh, Developer Tools, Algorithm Runtime, SaaS Platform, Nayak Labs Products',
  },
  '/services': {
    title: 'Software Services & Engineering Pods — Nayak Labs',
    description:
      'Embed a senior product engineering team for a defined engagement. We build web apps, AI integrations, internal tools, and automations with clean IP handover.',
    keywords:
      'Web Development, AI Solutions, Automation Tools, Engineering Pods, Full Stack Development, Nayak Labs Services',
  },
  '/academics': {
    title: 'Tech Training & Cohort Programs — Nayak Labs',
    description:
      'Cohort-based programs in AI engineering, DSA, and modern software craft taught by active builders who ship production code every week.',
    keywords:
      'AI Engineering Cohort, DSA Training, Software Engineering Mentorship, Systems Design, Nayak Labs Training',
  },
  '/coming-soon': {
    title: 'Nayak Labs — Releasing Soon',
    description:
      'New products, cohort tracks, and tools releasing soon from Nayak Labs.',
    keywords: 'Nayak Labs, Software Studio, Updates',
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
