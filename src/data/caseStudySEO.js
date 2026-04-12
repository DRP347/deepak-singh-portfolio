/**
 * SEO metadata for all case studies
 * Location: src/data/caseStudySEO.js
 * 
 * Update descriptions with your actual project details
 */

export const caseStudySEO = {
  'arabian-red-fox': {
    title: 'Arabian Red Fox – Wildlife Conservation Website',
    description:
      'A case study on designing an immersive wildlife conservation website for the Arabian Red Fox, featuring interactive storytelling and educational content.',
    image: '/img/proj2.webp',
    publishedDate: '2025-01-15',
    keywords: ['wildlife', 'conservation', 'web design', 'interactive', 'storytelling'],
  },

  'kumo-kitchen': {
    title: 'Kumo Kitchen – Restaurant Web Experience',
    description:
      'Designing a modern, appetizing web experience for Kumo Kitchen – blending Japanese culinary art with seamless digital ordering.',
    image: '/img/kumo-thumb.webp',
    publishedDate: '2025-02-20',
    keywords: ['restaurant', 'food', 'web design', 'UI/UX', 'Japanese cuisine'],
  },

  'pulse-studio': {
    title: 'Pulse Studio – Creative Agency Website',
    description:
      'Building a high-energy, motion-rich website for Pulse Studio – a creative agency that demands attention.',
    image: '/img/pulse-thumb.webp',
    publishedDate: '2025-03-10',
    keywords: ['agency', 'creative', 'motion design', 'branding', 'web development'],
  },

  'the-garment-guy': {
    title: 'The Garment Guy – E-commerce Fashion Platform',
    description:
      'Crafting a premium e-commerce experience for The Garment Guy – where fashion meets functionality.',
    image: '/img/garment-thumb.webp',
    publishedDate: '2025-04-01',
    keywords: ['e-commerce', 'fashion', 'retail', 'UI/UX', 'online shopping'],
  },

  portfolio: {
    title: 'Portfolio Case Study – Building My Digital Home',
    description:
      'A behind-the-scenes look at designing and developing my personal portfolio – the philosophy, process, and tech stack.',
    image: '/img/thumb.png',
    publishedDate: '2025-04-10',
    keywords: ['portfolio', 'personal branding', 'React', 'Three.js', 'web development'],
  },
};

/**
 * Get SEO data for a case study by slug
 * @param {string} slug - The URL slug of the case study
 * @returns {object|null} SEO data object or null if not found
 */
export function getCaseStudySEO(slug) {
  return caseStudySEO[slug] || null;
}