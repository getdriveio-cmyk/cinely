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
  },
  {
    id: "8",
    title: "Myke Wright does Comedy in Space",
    rating: "8.5",
    year: 2024,
    duration: 90,
    genre: ["Comedy", "Stand-up", "Sci-Fi"],
    poster: "/dist/assets/undefined_turn_this_into_a_mov.png",
    isAdFree: true,
    synopsis: "Join comedian Myke Wright on an out-of-this-world comedy adventure! In this hilarious stand-up special filmed in zero gravity, Myke delivers his signature wit and observational humor while floating through space. From alien encounters to the challenges of performing in a spacesuit, this comedy special takes laughter to new heights - literally!"
  }
];

export const movieRails = [
  {
    title: "Trending Now",
    movies: [mockMovies[7], mockMovies[6], mockMovies[1], mockMovies[0], mockMovies[4], mockMovies[2], mockMovies[5], mockMovies[3]] // Myke Wright first, then Numb
  },
  {
    title: "Action & Thrillers", 
    movies: [mockMovies[0], mockMovies[5], mockMovies[3], mockMovies[1], mockMovies[6]] // Numb included
  },
  {
    title: "Premium Ad-Free",
    movies: mockMovies.filter(movie => movie.isAdFree) // Both Numb and Myke Wright included automatically
  },
  {
    title: "Recently Added",
    movies: [mockMovies[7], mockMovies[6], mockMovies[4], mockMovies[1], mockMovies[0], mockMovies[3]] // Myke Wright and Numb as newest
  },
  {
    title: "Psychological Thrillers",
    movies: [mockMovies[6], mockMovies[3]] // Numb featured
  },
  {
    title: "Comedy Specials",
    movies: [mockMovies[7]] // New rail featuring Myke Wright
  },
  {
    title: "Sci-Fi Collection",
    movies: [mockMovies[1], mockMovies[5], mockMovies[7]] // Myke Wright added to Sci-Fi
  }
];