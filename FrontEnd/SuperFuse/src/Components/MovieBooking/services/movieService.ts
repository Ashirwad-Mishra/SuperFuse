import { movies } from '../data/movies';
import type { Movie } from '../interfaces/Movie';
import type { MovieGenre } from '../enums/MovieGenre';
import type { MovieLanguage } from '../enums/MovieLanguage';
import type { MovieFormat } from '../enums/MovieFormat';

export type MovieSortKey =
  | 'recommended'
  | 'rating'
  | 'title'
  | 'newest'
  | 'duration'
  | 'price';

export type ShowtimePeriod = 'morning' | 'afternoon' | 'evening' | 'night' | '';

class MovieService {
  getAllMovies(): Movie[] {
    return [...movies];
  }

  getMovieById(id: string): Movie | undefined {
    return movies.find((movie) => movie.id === id);
  }

  searchMovies(query: string): Movie[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.getAllMovies();
    }

    return movies.filter((movie) => {
      if (movie.title.toLowerCase().includes(normalized)) {
        return true;
      }
      if (movie.genres.some((genre) => genre.toLowerCase().includes(normalized))) {
        return true;
      }
      if (movie.languages.some((language) => language.toLowerCase().includes(normalized))) {
        return true;
      }
      if (movie.cast.some((actor) => actor.toLowerCase().includes(normalized))) {
        return true;
      }
      if (movie.cinemas.some((cinema) => cinema.name.toLowerCase().includes(normalized))) {
        return true;
      }
      if (movie.cinemas.some((cinema) => cinema.location.toLowerCase().includes(normalized))) {
        return true;
      }
      return false;
    });
  }

  filterMovies(
    source: Movie[],
    genreFilter: MovieGenre | '',
    languageFilter: MovieLanguage | '',
    formatFilter: MovieFormat | '',
    onlyNowShowing: boolean,
    minRating: number,
    period: ShowtimePeriod,
    maxPrice: number | null
  ): Movie[] {
    return source.filter((movie) => {
      if (genreFilter && !movie.genres.includes(genreFilter)) {
        return false;
      }
      if (languageFilter && !movie.languages.includes(languageFilter)) {
        return false;
      }
      if (formatFilter && !movie.formats.includes(formatFilter)) {
        return false;
      }
      if (onlyNowShowing && !movie.isNowShowing) {
        return false;
      }
      if (minRating && movie.rating < minRating) {
        return false;
      }
      if (period) {
        const hasPeriod = movie.cinemas.some((cinema) => cinema.showtimes.some((showtime) => this.isPeriod(showtime.startsAt, period)));
        if (!hasPeriod) {
          return false;
        }
      }
      if (maxPrice !== null) {
        const lowest = movie.cinemas.flatMap((cinema) => cinema.showtimes.map((showtime) => showtime.basePrice));
        if (lowest.length === 0 || Math.min(...lowest) > maxPrice) {
          return false;
        }
      }
      return true;
    });
  }

  sortMovies(source: Movie[], sortKey: MovieSortKey): Movie[] {
    const copy = [...source];
    switch (sortKey) {
      case 'rating':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'title':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
        return copy.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      case 'duration':
        return copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
      case 'price':
        return copy.sort((a, b) => this.getLowestPrice(a) - this.getLowestPrice(b));
      case 'recommended':
      default:
        return copy.sort((a, b) => b.rating - a.rating + (b.isNowShowing === a.isNowShowing ? 0 : b.isNowShowing ? 0.5 : -0.5));
    }
  }

  getShowtimesForMovie(movie: Movie): Movie['cinemas'] {
    return [...movie.cinemas];
  }

  getCinemaById(movie: Movie, cinemaId: string) {
    return movie.cinemas.find((cinema) => cinema.id === cinemaId);
  }

  private isPeriod(startsAt: string, period: ShowtimePeriod): boolean {
    const [time, meridiem = ''] = startsAt.trim().split(/\s+/);
    const rawHour = Number(time.split(':')[0]);
    const upperMeridiem = meridiem.toUpperCase();
    let hour = rawHour;

    if (upperMeridiem === 'PM' && rawHour !== 12) {
      hour = rawHour + 12;
    }
    if (upperMeridiem === 'AM' && rawHour === 12) {
      hour = 0;
    }

    if (Number.isNaN(hour)) {
      return false;
    }
    if (period === 'morning') {
      return hour >= 6 && hour < 12;
    }
    if (period === 'afternoon') {
      return hour >= 12 && hour < 17;
    }
    if (period === 'evening') {
      return hour >= 17 && hour < 21;
    }
    if (period === 'night') {
      return hour >= 21 || hour < 6;
    }
    return false;
  }

  private getLowestPrice(movie: Movie): number {
    const prices = movie.cinemas.flatMap((cinema) => cinema.showtimes.map((showtime) => showtime.basePrice));
    return prices.length ? Math.min(...prices) : Infinity;
  }
}

export const movieService = new MovieService();
