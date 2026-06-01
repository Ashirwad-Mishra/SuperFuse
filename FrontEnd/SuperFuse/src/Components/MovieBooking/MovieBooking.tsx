import React, { useMemo, useState } from 'react';
import { movieService, type MovieSortKey, type ShowtimePeriod } from './services/movieService';
import { bookingService } from './services/bookingService';
import type { Movie } from './interfaces/Movie';
import type { Cinema } from './interfaces/Cinema';
import type { Showtime } from './interfaces/Showtime';
import type { Seat } from './interfaces/Seat';
import type { MovieGenre } from './enums/MovieGenre';
import type { MovieLanguage } from './enums/MovieLanguage';
import type { MovieFormat } from './enums/MovieFormat';
import { SeatStatus } from './enums/SeatStatus';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import CinemaShowtimes from './components/CinemaShowtimes';
import SeatMap from './components/SeatMap';
import BookingSummary from './components/BookingSummary';
import CheckoutPanel, { type MovieBookingPaymentMethod } from './components/CheckoutPanel';
import BookingConfirmation from './components/BookingConfirmation';
import './MovieBooking.css';

const MAX_SEAT_SELECTION = 8;

const MovieBookingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | ''>('');
  const [selectedLanguage, setSelectedLanguage] = useState<MovieLanguage | ''>('');
  const [selectedFormat, setSelectedFormat] = useState<MovieFormat | ''>('');
  const [onlyNowShowing, setOnlyNowShowing] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceCap, setPriceCap] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<ShowtimePeriod>('');
  const [selectedSort, setSelectedSort] = useState<MovieSortKey>('recommended');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<MovieBookingPaymentMethod>('SuperPay');
  const [latestBooking, setLatestBooking] = useState(bookingService.getLatestBooking());
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const allMovies = useMemo(() => movieService.getAllMovies(), []);
  const filteredMovies = useMemo(() => {
    const searched = movieService.searchMovies(searchQuery);
    const filtered = movieService.filterMovies(
      searched,
      selectedGenre,
      selectedLanguage,
      selectedFormat,
      onlyNowShowing,
      minRating,
      selectedPeriod,
      priceCap
    );
    return movieService.sortMovies(filtered, selectedSort);
  }, [searchQuery, selectedGenre, selectedLanguage, selectedFormat, onlyNowShowing, minRating, selectedPeriod, priceCap, selectedSort]);

  const selectedSeats: Seat[] = useMemo(() => {
    if (!selectedShowtime) {
      return [];
    }
    return selectedShowtime.seats.filter((seat) => selectedSeatIds.includes(seat.id));
  }, [selectedShowtime, selectedSeatIds]);

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = selectedSeats.length ? 40 : 0;
  const taxes = Math.round((subtotal + convenienceFee) * 0.12);
  const totalPrice = subtotal + convenienceFee + taxes;

  const resetMovieSelection = (): void => {
    setSelectedMovie(null);
    setSelectedCinema(null);
    setSelectedShowtime(null);
    setSelectedSeatIds([]);
    setCheckoutOpen(false);
  };

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
    setSelectedCinema(null);
    setSelectedShowtime(null);
    setSelectedSeatIds([]);
    setCheckoutOpen(false);
  };

  const handleSelectShowtime = (showtime: Showtime, cinema: Cinema): void => {
    setSelectedShowtime(showtime);
    setSelectedCinema(cinema);
    setSelectedSeatIds([]);
    setCheckoutOpen(false);
  };

  const handleToggleSeat = (seat: Seat): void => {
    if (seat.status !== SeatStatus.Available) {
      return;
    }
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((current) => current.filter((id) => id !== seat.id));
      return;
    }
    if (selectedSeatIds.length >= MAX_SEAT_SELECTION) {
      return;
    }
    setSelectedSeatIds((current) => [...current, seat.id]);
  };

  const handleClearSelection = (): void => {
    setSelectedCinema(null);
    setSelectedShowtime(null);
    setSelectedSeatIds([]);
    setCheckoutOpen(false);
  };

  const handleBookNow = (): void => {
    if (
      !selectedMovie ||
      !selectedCinema ||
      !selectedShowtime ||
      selectedSeatIds.length === 0 ||
      !buyerName.trim() ||
      !buyerPhone.trim() ||
      !buyerEmail.trim()
    ) {
      return;
    }

    const seatsToBook = selectedShowtime.seats.filter((seat) => selectedSeatIds.includes(seat.id));
    const booking = bookingService.createBooking(
      selectedMovie,
      selectedCinema,
      selectedShowtime,
      seatsToBook,
      buyerName,
      buyerPhone,
      buyerEmail,
      paymentMethod
    );
    setLatestBooking(booking);
    setConfirmationOpen(true);
    setCheckoutOpen(false);
  };

  const handleFieldChange = (field: string, value: string): void => {
    switch (field) {
      case 'buyerName':
        setBuyerName(value);
        break;
      case 'buyerPhone':
        setBuyerPhone(value);
        break;
      case 'buyerEmail':
        setBuyerEmail(value);
        break;
      case 'paymentMethod':
        setPaymentMethod(value as MovieBookingPaymentMethod);
        break;
      default:
        break;
    }
  };

  const handleCloseConfirmation = (): void => {
    setConfirmationOpen(false);
  };

  return (
    <div className="moviebooking-page">
      <header className="moviebooking-header">
        <div>
          <h1>Movie Booking</h1>
          <p>Browse movies, choose showtimes, select seats, and complete your booking.</p>
        </div>
      </header>

      <section className="moviebooking-controls">
        <div className="moviebooking-search-row">
          <input
            type="search"
            placeholder="Search by title, genre, language, cast, or cinema"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              resetMovieSelection();
            }}
          />
          <select
            value={selectedSort}
            onChange={(event) => {
              setSelectedSort(event.target.value as MovieSortKey);
              resetMovieSelection();
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="newest">Newest</option>
            <option value="duration">Duration</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="moviebooking-filter-row">
          <select
            value={selectedGenre}
            onChange={(event) => {
              setSelectedGenre(event.target.value as MovieGenre | '');
              resetMovieSelection();
            }}
          >
            <option value="">All genres</option>
            {allMovies.flatMap((movie) => movie.genres)
              .filter((genre, index, array) => array.indexOf(genre) === index)
              .map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
          </select>
          <select
            value={selectedLanguage}
            onChange={(event) => {
              setSelectedLanguage(event.target.value as MovieLanguage | '');
              resetMovieSelection();
            }}
          >
            <option value="">All languages</option>
            {allMovies.flatMap((movie) => movie.languages)
              .filter((language, index, array) => array.indexOf(language) === index)
              .map((language) => (
                <option key={language} value={language}>{language}</option>
              ))}
          </select>
          <select
            value={selectedFormat}
            onChange={(event) => {
              setSelectedFormat(event.target.value as MovieFormat | '');
              resetMovieSelection();
            }}
          >
            <option value="">All formats</option>
            {allMovies.flatMap((movie) => movie.formats)
              .filter((format, index, array) => array.indexOf(format) === index)
              .map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(event) => {
              setSelectedPeriod(event.target.value as ShowtimePeriod);
              resetMovieSelection();
            }}
          >
            <option value="">Any time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <label className="moviebooking-switch-label">
            <input
              type="checkbox"
              checked={onlyNowShowing}
              onChange={(event) => {
                setOnlyNowShowing(event.target.checked);
                resetMovieSelection();
              }}
            />
            Now showing only
          </label>
          <label className="moviebooking-switch-label">
            <input
              type="checkbox"
              checked={minRating >= 4}
              onChange={(event) => {
                setMinRating(event.target.checked ? 4 : 0);
                resetMovieSelection();
              }}
            />
            4 star and above
          </label>
          <label className="moviebooking-price-label">
            Max price
            <input
              type="number"
              min={0}
              value={priceCap ?? ''}
              placeholder="Any"
              onChange={(event) => {
                setPriceCap(event.target.value ? Number(event.target.value) : null);
                resetMovieSelection();
              }}
            />
          </label>
        </div>
      </section>

      <div className="moviebooking-body">
        <main className="moviebooking-main">
          <section className="moviebooking-movie-list">
            <div className="moviebooking-section-header">
              <h2>Available movies</h2>
              <span>{filteredMovies.length} titles</span>
            </div>
            <div className="moviebooking-grid">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isActive={movie.id === selectedMovie?.id}
                  onSelect={handleSelectMovie}
                />
              ))}
            </div>
          </section>

          {selectedMovie ? (
            <section className="moviebooking-selection-panel">
              <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
              <div className="moviebooking-showtime-section">
                <h3>Choose a cinema and showtime</h3>
                <CinemaShowtimes
                  cinemas={selectedMovie.cinemas}
                  selectedShowtimeId={selectedShowtime?.id ?? null}
                  onSelectShowtime={handleSelectShowtime}
                />
              </div>

              {selectedShowtime ? (
                <div className="moviebooking-seat-selection-section">
                  <h3>Select your seats</h3>
                  <SeatMap
                    seats={selectedShowtime.seats}
                    selectedSeatIds={selectedSeatIds}
                    onToggleSeat={handleToggleSeat}
                    maxSelection={MAX_SEAT_SELECTION}
                  />
                </div>
              ) : (
                <div className="moviebooking-instruction-box">
                  Select a showtime to view seat availability.
                </div>
              )}
            </section>
          ) : (
            <div className="moviebooking-instruction-box moviebooking-prompt-box">
              Pick a movie to view the detail panel, choose showtimes, and select seats.
            </div>
          )}
        </main>

        <aside className="moviebooking-sidebar">
          <BookingSummary
            movie={selectedMovie}
            cinema={selectedCinema}
            showtime={selectedShowtime}
            selectedSeats={selectedSeatIds}
            totalPrice={totalPrice}
            onClearSelection={handleClearSelection}
            onCheckout={() => setCheckoutOpen(true)}
          />

          {checkoutOpen ? (
            <CheckoutPanel
              movie={selectedMovie}
              cinema={selectedCinema}
              showtime={selectedShowtime}
              selectedSeats={selectedSeatIds}
              buyerName={buyerName}
              buyerPhone={buyerPhone}
              buyerEmail={buyerEmail}
              paymentMethod={paymentMethod}
              onFieldChange={handleFieldChange}
              onBook={handleBookNow}
            />
          ) : (
            <div className="moviebooking-instruction-box">
              Continue to checkout to enter your details and confirm your booking.
            </div>
          )}
        </aside>
      </div>

      {confirmationOpen ? (
        <BookingConfirmation booking={latestBooking} onClose={handleCloseConfirmation} />
      ) : null}
    </div>
  );
};

export default MovieBookingPage;
