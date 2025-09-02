// Import images directly - Vite will handle the paths correctly
import poster1Img from "@/assets/poster-1.jpg";
import poster2Img from "@/assets/poster-2.jpg";
import poster3Img from "@/assets/poster-3.jpg";
import poster4Img from "@/assets/poster-4.jpg";
import poster5Img from "@/assets/poster-5.jpg";
import poster6Img from "@/assets/poster-6.jpg";
import heroBannerImg from "@/assets/hero-banner.jpg";

// Export the imported images - Vite will provide the correct URLs
export const poster1 = poster1Img;
export const poster2 = poster2Img;
export const poster3 = poster3Img;
export const poster4 = poster4Img;
export const poster5 = poster5Img;
export const poster6 = poster6Img;
export const heroBanner = heroBannerImg;

// Debug logging
console.log('Image paths:', {
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster6,
  heroBanner
});

// Special assets that are always in public folder
export const numbPoster = "/dist/assets/images.png";
export const mykeWrightPoster = "/dist/assets/undefined_turn_this_into_a_mov.png";
