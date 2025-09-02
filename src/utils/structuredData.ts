// Structured Data (JSON-LD) utilities for SEO

export interface MovieData {
  id: string;
  title: string;
  description: string;
  genre: string[];
  year: number;
  rating: string;
  duration?: string;
  director?: string;
  cast?: string[];
  poster: string;
}

export interface TVShowData {
  id: string;
  title: string;
  description: string;
  genre: string[];
  year: number;
  rating: string;
  seasons?: number;
  episodes?: number;
  poster: string;
}

// Website structured data
export const getWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cinely",
  "alternateName": "Cinely Streaming",
  "url": "https://cinely.vercel.app",
  "description": "Stream thousands of movies and shows with Cinely. Watch free with ads or upgrade to our premium ad-free experience.",
  "publisher": {
    "@type": "Organization",
    "name": "Cinely",
    "url": "https://cinely.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cinely.vercel.app/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cinely.vercel.app/movies?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

// Organization structured data
export const getOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cinely",
  "url": "https://cinely.vercel.app",
  "logo": "https://cinely.vercel.app/logo.png",
  "description": "Premium streaming platform offering thousands of movies and TV shows",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/cinely",
    "https://facebook.com/cinely",
    "https://instagram.com/cinely"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-CINELY",
    "contactType": "customer service",
    "availableLanguage": "English"
  }
});

// Movie structured data
export const getMovieStructuredData = (movie: MovieData) => ({
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": movie.title,
  "description": movie.description,
  "image": movie.poster,
  "datePublished": movie.year.toString(),
  "genre": movie.genre,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": movie.rating,
    "bestRating": "10",
    "worstRating": "1"
  },
  "duration": movie.duration || "PT120M",
  "director": movie.director ? {
    "@type": "Person",
    "name": movie.director
  } : undefined,
  "actor": movie.cast?.map(actor => ({
    "@type": "Person",
    "name": actor
  })) || [],
  "url": `https://cinely.vercel.app/movies/${movie.id}`,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Free streaming with ads"
  }
});

// TV Show structured data
export const getTVShowStructuredData = (show: TVShowData) => ({
  "@context": "https://schema.org",
  "@type": "TVSeries",
  "name": show.title,
  "description": show.description,
  "image": show.poster,
  "datePublished": show.year.toString(),
  "genre": show.genre,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": show.rating,
    "bestRating": "10",
    "worstRating": "1"
  },
  "numberOfSeasons": show.seasons || 1,
  "numberOfEpisodes": show.episodes || 1,
  "url": `https://cinely.vercel.app/tv-shows/${show.id}`,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Free streaming with ads"
  }
});

// Breadcrumb structured data
export const getBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://cinely.vercel.app${item.url}`
  }))
});

// FAQ structured data
export const getFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// VideoObject structured data for streaming content
export const getVideoObjectStructuredData = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.name,
  "description": video.description,
  "thumbnailUrl": video.thumbnailUrl,
  "uploadDate": video.uploadDate,
  "duration": video.duration,
  "contentUrl": video.contentUrl,
  "embedUrl": video.contentUrl,
  "publisher": {
    "@type": "Organization",
    "name": "Cinely",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cinely.vercel.app/logo.png"
    }
  }
});

// CollectionPage structured data for category pages
export const getCollectionPageStructuredData = (collection: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  items: Array<{name: string, url: string}>;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": collection.name,
  "description": collection.description,
  "url": `https://cinely.vercel.app${collection.url}`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": collection.numberOfItems,
    "itemListElement": collection.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "url": `https://cinely.vercel.app${item.url}`
    }))
  }
});
