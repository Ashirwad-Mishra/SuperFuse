import { MovieGenre } from '../enums/MovieGenre';
import { MovieLanguage } from '../enums/MovieLanguage';
import { MovieFormat } from '../enums/MovieFormat';
import { SeatStatus } from '../enums/SeatStatus';
import type { Movie } from '../interfaces/Movie';
import type { Showtime } from '../interfaces/Showtime';
import type { Seat } from '../interfaces/Seat';

const createSeatRow = (row: string, startPrice: number): Seat[] => {
  return Array.from({ length: 8 }, (_, index) => {
    const number = index + 1;
    const price = startPrice + (index >= 6 ? 80 : index >= 4 ? 50 : 0);
    const status = index === 2 || index === 6 ? SeatStatus.Booked : index === 4 ? SeatStatus.Blocked : SeatStatus.Available;
    const type = index >= 6 ? 'Recliner' : index >= 4 ? 'Premium' : 'Regular';
    return {
      id: `${row}${number}`,
      row,
      number,
      type,
      price,
      status,
    };
  });
};

const createSeats = (startPrice: number): Seat[] => {
  return ['A', 'B', 'C', 'D', 'E'].flatMap((row) => createSeatRow(row, startPrice));
};

const createShowtime = (
  id: string,
  movieId: string,
  cinemaId: string,
  screenName: string,
  startsAt: string,
  format: MovieFormat,
  basePrice: number
): Showtime => {
  const seats = createSeats(basePrice);
  const availableSeats = seats.filter((seat) => seat.status === SeatStatus.Available).length;
  return {
    id,
    movieId,
    cinemaId,
    screenName,
    startsAt,
    format,
    basePrice,
    seats,
    availableSeats,
  };
};

const createCinema = (
  id: string,
  name: string,
  location: string,
  distanceKm: number,
  amenities: string[],
  showtimes: Showtime[]
) => {
  const cinemaImages: Record<string, string> = {
    'superplex-central': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    'metromax-cinema': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    'galaxy-screens': 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
    'royal-screens': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80',
    'cinewave-mall': 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=900&q=80',
    'prism-imax': 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=900&q=80',
  };

  return { id, name, location, image: cinemaImages[id], distanceKm, amenities, showtimes };
};

export const movies: Movie[] = [
  {
    id: 'neon-skies',
    title: 'Neon Skies',
    description: 'A high-energy sci-fi thriller where a rogue pilot uncovers hidden city secrets.',
    genres: [MovieGenre.Action, MovieGenre.SciFi, MovieGenre.Thriller],
    languages: [MovieLanguage.English, MovieLanguage.Hindi],
    formats: [MovieFormat.TwoD, MovieFormat.IMAX, MovieFormat.FourDX],
    durationMinutes: 132,
    certificate: 'U/A',
    rating: 4.5,
    releaseDate: '2026-05-18',
    poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=700&q=80',
    cast: ['Aarya Shah', 'Dev Rao', 'Mira Patel'],
    director: 'Karan Mehta',
    isNowShowing: true,
    cinemas: [
      createCinema('superplex-central', 'SuperPlex Central', 'Downtown Plaza', 2.3, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('ns-spc-1', 'neon-skies', 'superplex-central', 'Screen 5', '10:20 AM', MovieFormat.TwoD, 250),
        createShowtime('ns-spc-2', 'neon-skies', 'superplex-central', 'Screen 5', '1:50 PM', MovieFormat.IMAX, 420),
        createShowtime('ns-spc-3', 'neon-skies', 'superplex-central', 'Screen 5', '6:20 PM', MovieFormat.FourDX, 520),
      ]),
      createCinema('metromax-cinema', 'MetroMax Cinema', 'City Square', 3.8, ['Food Court', 'Parking', 'IPTV'], [
        createShowtime('ns-mm-1', 'neon-skies', 'metromax-cinema', 'Hall 2', '11:10 AM', MovieFormat.TwoD, 220),
        createShowtime('ns-mm-2', 'neon-skies', 'metromax-cinema', 'Hall 2', '4:00 PM', MovieFormat.IMAX, 410),
      ]),
    ],
  },
  {
    id: 'last-signal',
    title: 'The Last Signal',
    description: 'A detective thriller and emotional journey through one final transmission.',
    genres: [MovieGenre.Drama, MovieGenre.Thriller],
    languages: [MovieLanguage.English],
    formats: [MovieFormat.TwoD, MovieFormat.ThreeD],
    durationMinutes: 125,
    certificate: 'A',
    rating: 4.2,
    releaseDate: '2026-04-30',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
    cast: ['Riya Verma', 'Nikhil Suri', 'Poornima Rao'],
    director: 'Sakshi Malhotra',
    isNowShowing: true,
    cinemas: [
      createCinema('galaxy-screens', 'Galaxy Screens', 'Riverfront Mall', 2.9, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('ls-gs-1', 'last-signal', 'galaxy-screens', 'Screen 3', '9:30 AM', MovieFormat.TwoD, 240),
        createShowtime('ls-gs-2', 'last-signal', 'galaxy-screens', 'Screen 3', '2:20 PM', MovieFormat.ThreeD, 320),
        createShowtime('ls-gs-3', 'last-signal', 'galaxy-screens', 'Screen 3', '8:00 PM', MovieFormat.ThreeD, 340),
      ]),
      createCinema('royal-screens', 'Royal Screens', 'Old Town', 4.5, ['Food Court', 'Dolby Atmos', 'VIP Lounge'], [
        createShowtime('ls-rs-1', 'last-signal', 'royal-screens', 'Gold Hall', '12:00 PM', MovieFormat.TwoD, 260),
      ]),
    ],
  },
  {
    id: 'metro-hearts',
    title: 'Metro Hearts',
    description: 'A romantic drama set against the vibrant pulse of a modern city.',
    genres: [MovieGenre.Romance, MovieGenre.Drama],
    languages: [MovieLanguage.Hindi, MovieLanguage.English],
    formats: [MovieFormat.TwoD],
    durationMinutes: 118,
    certificate: 'U',
    rating: 4.1,
    releaseDate: '2026-03-12',
    poster: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80',
    cast: ['Kavya Sen', 'Aryan Joshi', 'Mehul Varma'],
    director: 'Nisha Bhatia',
    isNowShowing: true,
    cinemas: [
      createCinema('cinewave-mall', 'CineWave Mall', 'Park Avenue', 1.9, ['Food Court', 'Recliner', 'Parking'], [
        createShowtime('mh-cw-1', 'metro-hearts', 'cinewave-mall', 'Hall 1', '10:00 AM', MovieFormat.TwoD, 210),
        createShowtime('mh-cw-2', 'metro-hearts', 'cinewave-mall', 'Hall 1', '3:40 PM', MovieFormat.TwoD, 210),
      ]),
      createCinema('royal-screens', 'Royal Screens', 'Old Town', 4.5, ['Food Court', 'Dolby Atmos', 'VIP Lounge'], [
        createShowtime('mh-rs-1', 'metro-hearts', 'royal-screens', 'Gold Hall', '7:15 PM', MovieFormat.TwoD, 230),
      ]),
    ],
  },
  {
    id: 'kingdom-of-ash',
    title: 'Kingdom of Ash',
    description: 'A sweeping fantasy epic with warriors, magic, and a battle for the crown.',
    genres: [MovieGenre.Fantasy, MovieGenre.Adventure, MovieGenre.Action],
    languages: [MovieLanguage.English],
    formats: [MovieFormat.TwoD, MovieFormat.IMAX],
    durationMinutes: 149,
    certificate: 'U/A',
    rating: 4.7,
    releaseDate: '2026-06-02',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=700&q=80',
    cast: ['Sana Iyer', 'Vihaan Malik', 'Rohan Bose'],
    director: 'Alisha Nair',
    isNowShowing: true,
    cinemas: [
      createCinema('prism-imax', 'Prism IMAX', 'Tech Park', 5.1, ['IMAX', 'Dolby Atmos', 'Parking'], [
        createShowtime('ka-pi-1', 'kingdom-of-ash', 'prism-imax', 'IMAX Dome', '11:45 AM', MovieFormat.IMAX, 520),
        createShowtime('ka-pi-2', 'kingdom-of-ash', 'prism-imax', 'IMAX Dome', '6:45 PM', MovieFormat.IMAX, 540),
      ]),
      createCinema('superplex-central', 'SuperPlex Central', 'Downtown Plaza', 2.3, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('ka-spc-1', 'kingdom-of-ash', 'superplex-central', 'Screen 1', '4:30 PM', MovieFormat.TwoD, 290),
      ]),
    ],
  },
  {
    id: 'laugh-riot',
    title: 'Laugh Riot',
    description: 'A feel-good comedy about friends, family chaos, and a wildly unexpected wedding plan.',
    genres: [MovieGenre.Comedy, MovieGenre.Romance],
    languages: [MovieLanguage.Hindi, MovieLanguage.English],
    formats: [MovieFormat.TwoD, MovieFormat.ThreeD],
    durationMinutes: 108,
    certificate: 'U',
    rating: 4.0,
    releaseDate: '2026-04-08',
    poster: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=700&q=80',
    cast: ['Asha Kapoor', 'Karan Gill', 'Mira Sharma'],
    director: 'Rohit Desai',
    isNowShowing: true,
    cinemas: [
      createCinema('metromax-cinema', 'MetroMax Cinema', 'City Square', 3.8, ['Food Court', 'Parking', 'IPTV'], [
        createShowtime('lr-mm-1', 'laugh-riot', 'metromax-cinema', 'Hall 1', '12:30 PM', MovieFormat.TwoD, 195),
        createShowtime('lr-mm-2', 'laugh-riot', 'metromax-cinema', 'Hall 1', '8:15 PM', MovieFormat.ThreeD, 250),
      ]),
      createCinema('cinewave-mall', 'CineWave Mall', 'Park Avenue', 1.9, ['Food Court', 'Recliner', 'Parking'], [
        createShowtime('lr-cw-1', 'laugh-riot', 'cinewave-mall', 'Hall 2', '4:45 PM', MovieFormat.TwoD, 205),
      ]),
    ],
  },
  {
    id: 'midnight-chase',
    title: 'Midnight Chase',
    description: 'An edge-of-your-seat thriller about a courier racing against time through dark city streets.',
    genres: [MovieGenre.Action, MovieGenre.Thriller],
    languages: [MovieLanguage.English],
    formats: [MovieFormat.TwoD, MovieFormat.IMAX],
    durationMinutes: 122,
    certificate: 'U/A',
    rating: 4.4,
    releaseDate: '2026-05-05',
    poster: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=80',
    cast: ['Vivaan Shah', 'Megha Kapoor', 'Ravinder Yadav'],
    director: 'Ananya Rao',
    isNowShowing: true,
    cinemas: [
      createCinema('prism-imax', 'Prism IMAX', 'Tech Park', 5.1, ['IMAX', 'Dolby Atmos', 'Parking'], [
        createShowtime('mc-pi-1', 'midnight-chase', 'prism-imax', 'IMAX Dome', '9:20 PM', MovieFormat.IMAX, 530),
      ]),
      createCinema('galaxy-screens', 'Galaxy Screens', 'Riverfront Mall', 2.9, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('mc-gs-1', 'midnight-chase', 'galaxy-screens', 'Screen 2', '7:50 PM', MovieFormat.TwoD, 270),
      ]),
    ],
  },
  {
    id: 'ocean-between-us',
    title: 'Ocean Between Us',
    description: 'A heartfelt drama about love, distance, and a journey across continents.',
    genres: [MovieGenre.Drama, MovieGenre.Romance],
    languages: [MovieLanguage.English],
    formats: [MovieFormat.TwoD],
    durationMinutes: 116,
    certificate: 'U/A',
    rating: 4.3,
    releaseDate: '2026-02-20',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    cast: ['Isha Malhotra', 'Rahul Anand', 'Priya Nambiar'],
    director: 'Sahil Mehra',
    isNowShowing: false,
    cinemas: [
      createCinema('superplex-central', 'SuperPlex Central', 'Downtown Plaza', 2.3, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('ob-usc-1', 'ocean-between-us', 'superplex-central', 'Screen 4', '11:15 AM', MovieFormat.TwoD, 210),
      ]),
    ],
  },
  {
    id: 'future-city-2099',
    title: 'Future City 2099',
    description: 'A futuristic adventure into a neon metropolis where faith meets technology.',
    genres: [MovieGenre.SciFi, MovieGenre.Action, MovieGenre.Adventure],
    languages: [MovieLanguage.English],
    formats: [MovieFormat.IMAX, MovieFormat.FourDX],
    durationMinutes: 138,
    certificate: 'U/A',
    rating: 4.6,
    releaseDate: '2026-06-06',
    poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80',
    cast: ['Jiya Kapoor', 'Anil Menon', 'Naveen Dutta'],
    director: 'Deepa Sethi',
    isNowShowing: true,
    cinemas: [
      createCinema('prism-imax', 'Prism IMAX', 'Tech Park', 5.1, ['IMAX', 'Dolby Atmos', 'Parking'], [
        createShowtime('fc-pi-1', 'future-city-2099', 'prism-imax', 'IMAX Dome', '1:30 PM', MovieFormat.IMAX, 510),
        createShowtime('fc-pi-2', 'future-city-2099', 'prism-imax', 'IMAX Dome', '9:00 PM', MovieFormat.FourDX, 580),
      ]),
      createCinema('galaxy-screens', 'Galaxy Screens', 'Riverfront Mall', 2.9, ['Parking', 'Recliner', 'Dolby Atmos'], [
        createShowtime('fc-gs-1', 'future-city-2099', 'galaxy-screens', 'Screen 4', '6:15 PM', MovieFormat.TwoD, 285),
      ]),
    ],
  },
  {
    id: 'sweet-cravings',
    title: 'Sweet Cravings',
    description: 'A light musical comedy exploring friendship, pastries and a cooking competition.',
    genres: [MovieGenre.Comedy, MovieGenre.Drama],
    languages: [MovieLanguage.English, MovieLanguage.Hindi],
    formats: [MovieFormat.TwoD],
    durationMinutes: 104,
    certificate: 'U',
    rating: 4.0,
    releaseDate: '2026-04-18',
    poster: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    cast: ['Neha Sharma', 'Kabir Singh', 'Tara Rao'],
    director: 'Madhav Singh',
    isNowShowing: true,
    cinemas: [
      createCinema('cinewave-mall', 'CineWave Mall', 'Park Avenue', 1.9, ['Food Court', 'Recliner', 'Parking'], [
        createShowtime('sc-cw-1', 'sweet-cravings', 'cinewave-mall', 'Hall 3', '10:30 AM', MovieFormat.TwoD, 190),
        createShowtime('sc-cw-2', 'sweet-cravings', 'cinewave-mall', 'Hall 3', '5:00 PM', MovieFormat.TwoD, 190),
      ]),
      createCinema('metromax-cinema', 'MetroMax Cinema', 'City Square', 3.8, ['Food Court', 'Parking', 'IPTV'], [
        createShowtime('sc-mm-1', 'sweet-cravings', 'metromax-cinema', 'Hall 4', '2:30 PM', MovieFormat.TwoD, 200),
      ]),
    ],
  },
];
