// Utility to get correct image paths for both development and production
// In development, Vite serves assets with different URLs
// In production, we use the built asset paths

const isDevelopment = import.meta.env.DEV;

// Import all poster images for development
import poster1Dev from "@/assets/poster-1.jpg";
import poster2Dev from "@/assets/poster-2.jpg";
import poster3Dev from "@/assets/poster-3.jpg";
import poster4Dev from "@/assets/poster-4.jpg";
import poster5Dev from "@/assets/poster-5.jpg";
import poster6Dev from "@/assets/poster-6.jpg";
import heroBannerDev from "@/assets/hero-banner.jpg";

// Production paths (built assets with hashes)
const poster1Prod = "/dist/assets/poster-1-09MI7_5e.jpg";
const poster2Prod = "/dist/assets/poster-2-D3KWPSpU.jpg";
const poster3Prod = "/dist/assets/poster-3-r1X99Uqi.jpg";
const poster4Prod = "/dist/assets/poster-4-DplWFywa.jpg";
const poster5Prod = "/dist/assets/poster-5-CGFcUoxB.jpg";
const poster6Prod = "/dist/assets/poster-6-CwBqk9Ys.jpg";
const heroBannerProd = "/dist/assets/hero-banner-DBz6Sf7I.jpg";

// Export the correct paths based on environment
export const poster1 = isDevelopment ? poster1Dev : poster1Prod;
export const poster2 = isDevelopment ? poster2Dev : poster2Prod;
export const poster3 = isDevelopment ? poster3Dev : poster3Prod;
export const poster4 = isDevelopment ? poster4Dev : poster4Prod;
export const poster5 = isDevelopment ? poster5Dev : poster5Prod;
export const poster6 = isDevelopment ? poster6Dev : poster6Prod;
export const heroBanner = isDevelopment ? heroBannerDev : heroBannerProd;

// Special assets that are always in public folder
export const numbPoster = "/dist/assets/images.png";
export const mykeWrightPoster = "/dist/assets/undefined_turn_this_into_a_mov.png";
