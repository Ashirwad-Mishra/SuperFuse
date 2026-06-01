import type { Cinema } from './Cinema';
import type { MovieGenre } from '../enums/MovieGenre';
import type { MovieLanguage } from '../enums/MovieLanguage';
import type { MovieFormat } from '../enums/MovieFormat';

export interface Movie {
  id: string;
  title: string;
  description: string;
  genres: MovieGenre[];
  languages: MovieLanguage[];
  formats: MovieFormat[];
  durationMinutes: number;
  certificate: string;
  rating: number;
  releaseDate: string;
  poster: string;
  cast: string[];
  director: string;
  isNowShowing: boolean;
  cinemas: Cinema[];
}
