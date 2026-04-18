/**
 * EXAMPLE: How to use SEO component in your case study pages
 * 
 * Add this to each of your case study components (ArabianRedFox.jsx, KumoKitchen.jsx, etc.)
 */

// ============================================
// OPTION 1: Using the centralized SEO data
// ============================================

import SEO from '../components/SEO';
import { getCaseStudySEO } from '../data/caseStudySEO';

export default function ArabianRedFox() {
  const seo = getCaseStudySEO('arabian-red-fox');

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image}
        path="/case-study/arabian-red-fox"
        type="article"
        publishedDate={seo.publishedDate}
      />

      {/* Your existing component content */}
      <div>
        {/* ... */}
      </div>
    </>
  );
}


// ============================================
// OPTION 2: Inline SEO (simpler, per-component)
// ============================================

import SEO from '../components/SEO';

export default function KumoKitchen() {
  return (
    <>
      <SEO
        title="Kumo Kitchen – Restaurant Web Experience"
        description="Designing a modern, appetizing web experience for Kumo Kitchen – blending Japanese culinary art with seamless digital ordering."
        image="/img/case-studies/kumo-kitchen-og.webp"
        path="/case-study/kumo-kitchen"
        type="article"
      />

      {/* Your existing component content */}
      <div>
        {/* ... */}
      </div>
    </>
  );
}


// ============================================
// OPTION 3: Using CaseStudyLayout wrapper
// ============================================

// In CaseStudyLayout.jsx - wrap all case studies with SEO
import SEO from '../components/SEO';
import { getCaseStudySEO } from '../data/caseStudySEO';
import { useParams } from 'react-router-dom';

export default function CaseStudyLayout({ children }) {
  const { slug } = useParams(); // assumes route is /case-study/:slug
  const seo = getCaseStudySEO(slug);

  return (
    <>
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image}
          path={`/case-study/${slug}`}
          type="article"
          publishedDate={seo.publishedDate}
        />
      )}
      {children}
    </>
  );
}
