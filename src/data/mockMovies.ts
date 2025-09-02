import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
// Use public path for Numb poster
const numbPoster = "/dist/assets/images.png";

export interface Movie {
  id: string;
  title: string;
  rating: string;
  year: number;
  duration: number; // in minutes
  genre: string[];
  poster: string;
  isAdFree?: boolean;
  synopsis?: string;
}

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Dark Horizon",
    rating: "8.4",
    year: 2024,
    duration: 142,
    genre: ["Action", "Thriller"],
    poster: poster1,
    synopsis: "A gripping thriller that takes you to the edge of reality in a dark urban landscape."
  },
  {
    id: "2", 
    title: "Neon Dreams",
    rating: "7.9",
    year: 2024,
    duration: 118,
    genre: ["Sci-Fi", "Adventure"],
    poster: poster2,
    isAdFree: true,
    synopsis: "Step into a cyberpunk future where dreams and reality blur in neon-lit streets."
  },
  {
    id: "3",
    title: "The Last Stand",
    rating: "9.1",
    year: 2023,
    duration: 156,
    genre: ["Drama", "War"],
    poster: poster3,
    synopsis: "An emotional journey through the final moments that define a generation."
  },
  {
    id: "4",
    title: "Midnight Terror", 
    rating: "7.2",
    year: 2024,
    duration: 98,
    genre: ["Horror", "Thriller"],
    poster: poster4,
    synopsis: "When darkness falls, terror awakens in this spine-chilling horror experience."
  },
  {
    id: "5",
    title: "City Lights",
    rating: "8.7",
    year: 2024,
    duration: 104,
    genre: ["Comedy", "Romance"],
    poster: poster5,
    isAdFree: true,
    synopsis: "A heartwarming comedy that illuminates love in the bustling city streets."
  },
  {
    id: "6",
    title: "Ocean's Edge",
    rating: "8.0",
    year: 2023,
    duration: 134,
    genre: ["Adventure", "Action"],
    poster: poster6,
    synopsis: "Dive into an epic adventure where courage meets the vast unknown waters."
  },
  {
    id: "7",
    title: "Numb",
    rating: "8.9",
    year: 2024,
    duration: 120,
    genre: ["Drama", "Thriller", "Psychological"],
    poster: numbPoster,
    isAdFree: true,
    synopsis: "A gripping psychological thriller that follows a man who loses the ability to feel physical pain after a traumatic accident. As he navigates a world where he can no longer distinguish between safety and danger, he discovers that emotional numbness might be the real curse."
  }
];

export const movieRails = [
  {
    title: "Trending Now",
    movies: [mockMovies[6], mockMovies[1], mockMovies[0], mockMovies[4], mockMovies[2], mockMovies[5], mockMovies[3]] // Added Numb first
  },
  {
    title: "Action & Thrillers", 
    movies: [mockMovies[0], mockMovies[5], mockMovies[3], mockMovies[1], mockMovies[6]] // Added Numb
  },
  {
    title: "Premium Ad-Free",
    movies: mockMovies.filter(movie => movie.isAdFree) // Numb will be included automatically
  },
  {
    title: "Recently Added",
    movies: [mockMovies[6], mockMovies[4], mockMovies[1], mockMovies[0], mockMovies[3]] // Numb as newest
  },
  {
    title: "Psychological Thrillers",
    movies: [mockMovies[6], mockMovies[3]] // New rail featuring Numb
  },
  {
    title: "Sci-Fi Collection",
    movies: [mockMovies[1], mockMovies[5]]
  }
];