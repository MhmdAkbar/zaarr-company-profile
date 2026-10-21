// Sumber copy: https://zaar-mocha.vercel.app/ (diambil apa adanya, jangan diubah/diperbaiki)

export const site = {
  title: 'Zaar - Integrated Solutions',
  logo: { src: '/Resources/Image/logo-zaar.png', alt: 'Zaar Logo', href: '#' },
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
]

export const hero = {
  video: '/Resources/Video/0706.mp4',
  videoFallback: 'Browser sampeyan gak support video tag.',
  // Judul: "Digital Transformation." + line break + "Simplified."
  titleLines: ['Digital Transformation.', 'Simplified.'],
  // Tagline: baris 1 + line break + baris 2
  taglineLines: [
    'Zaar is a one-stop solution integrator.',
    'Integrated | Scalable | Efficiency | Measurable | Secured.',
  ],
  cta: { label: 'Discover Solutions', href: '#products' },
}

export const about = {
  id: 'about',
  title: 'About ZAAR.',
  text: "We create bespoke platforms to transform an organization's physical operations into intuitive data-driven operations with real-time situational awareness. Our management team brings over 20 years of industry experience to address and resolve growing pain points in the security world.",
}

export const services = {
  id: 'services',
  title: 'Our Services.',
  items: [
    {
      title: 'Advanced Integration',
      text: 'Using digital advances like AI, analytics, and smart devices to solve problems in safety, security, and energy aspects.',
    },
    {
      title: 'Unified Management',
      text: 'A tailored platform giving full command and control across systems for security, safety, and energy operation centers.',
    },
    {
      title: 'Workforce Design',
      text: 'End-to-end consultancy services that help companies design processes to optimize productivity and proactively resolve issues.',
    },
  ],
}

export const products = {
  id: 'products',
  title: 'Innovative Products.',
  // Tombol "Learn more" dan "Buy" di situs asli href="#" (dummy). Pertahankan.
  actions: [
    { label: 'Learn more', href: '#' },
    { label: 'Buy', href: '#' },
  ],
  items: [
    {
      title: 'Zaar Unified Platform',
      text: 'Open architecture engine integrating sub-systems from across security and energy.',
      image: { src: '/Resources/Image/unified.png', alt: 'Zaar Unified Platform' },
    },
    {
      title: 'Zaar iMOPS™',
      text: 'Manage incidents, verify data sources, and trigger automated workflows efficiently.',
      image: { src: '/Resources/Image/imops.png', alt: 'Zaar i-MOPSTM' },
    },
    {
      title: 'Zaar SmartPatrol',
      text: 'Smart guard patrolling features with real-time monitoring and SOS alarm.',
      image: { src: '/Resources/Image/product-patrol.png', alt: 'Zaar SmartPatrol' },
    },
    {
      title: 'Cyber Security',
      text: 'Protect enterprise assets and vendor data seamlessly with robust prevention.',
      // Nama file asli memang typo ("cybersecuirty"). Jangan diganti.
      image: { src: '/Resources/Image/cybersecuirty.png', alt: 'Cyber Security' },
    },
    {
      title: 'Hospital Information System',
      text: 'Integrated healthcare management tailored to streamline patient data and operations.',
      image: { src: '/Resources/Image/HIS.png', alt: 'Hospital Information System' },
    },
  ],
}

export const footer = {
  brand: 'Zaar.',
  tagline: 'Headquartered in Indonesia • Dedicated to SMART goals.',
  copyright: '© 2026 Zaar. All rights reserved.',
}
