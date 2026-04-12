import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for dynamic meta tags
 * Usage: <SEO title="Page Title" description="Page description" image="/img/og-image.webp" />
 */

const DEFAULT_SEO = {
  siteName: 'Deepak Singh — Web Alchemist',
  siteUrl: 'https://www.deepakksingh.com',
  defaultTitle: 'Deepak Singh – Web Designer & Developer',
  defaultDescription:
    'Deepak Singh is a Web Alchemist and creative web developer who builds immersive, story-led web experiences with React, Three.js, and thoughtful UI/UX.',
  defaultImage: '/img/thumb.png',
  twitterHandle: '@Deepak__Singh4',
};

export default function SEO({
  title,
  description,
  image,
  path = '',
  type = 'website',
  publishedDate,
  noIndex = false,
}) {
  const seo = {
    title: title ? `${title} | ${DEFAULT_SEO.siteName}` : DEFAULT_SEO.defaultTitle,
    description: description || DEFAULT_SEO.defaultDescription,
    image: image?.startsWith('http')
      ? image
      : `${DEFAULT_SEO.siteUrl}${image || DEFAULT_SEO.defaultImage}`,
    url: `${DEFAULT_SEO.siteUrl}${path}`,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />

      {/* Article specific (for case studies) */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && (
        <meta property="article:author" content="Deepak Singh" />
      )}
    </Helmet>
  );
}
