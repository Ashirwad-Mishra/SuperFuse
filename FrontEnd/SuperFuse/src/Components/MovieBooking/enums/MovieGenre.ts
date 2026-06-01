export const MovieGenre = {
  Action: 'Action',
  Adventure: 'Adventure',
  Drama: 'Drama',
  Comedy: 'Comedy',
  Thriller: 'Thriller',
  SciFi: 'Sci-Fi',
  Romance: 'Romance',
  Fantasy: 'Fantasy',
  Horror: 'Horror',
} as const;

export type MovieGenre = (typeof MovieGenre)[keyof typeof MovieGenre];
export const MovieGenres: MovieGenre[] = Object.values(MovieGenre);
