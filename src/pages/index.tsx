import { useState } from 'react';
import { fetchCurrentWeather } from '../lib/api';
import { useWeatherStore } from '../store/weatherStore';
import Link from 'next/link';
import WeatherCard from '@/components/WeatherCard';
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    city,
    weather,
    setCity,
    setWeather,
    clearWeather,
    addFavorite,
    favorites
  } = useWeatherStore();

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await fetchCurrentWeather(city);
      setWeather(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setErrorMessage('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = city && favorites.includes(city);

  return (
    <div className={styles.wrapper}>
  <header className={`${styles.header} d-flex justify-content-between align-items-center p-3`}>
    <h1 className="mb-0">Weather forecast</h1>
    <nav className="d-flex gap-3">
      <Link href="/" className="text-decoration-none">Home</Link>
      <Link href="/forecast" className="text-decoration-none">5 day forecast</Link>
      <Link href="/favorites" className="text-decoration-none">Favorites <span>{favorites.length}</span></Link>
    </nav>
  </header>

  <main className={`${styles.main} container`}>
    <div className={styles.searchBox}>
      <div className="input-group mb-3">
        <input
          type="text"
          className={`form-control ${styles.inputCustom}`}
          placeholder="Enter city..."
          value={city}
          onChange={(e) => {
            const val = e.target.value;
            setCity(val);
          }}
        />
        {suggestions.length > 0 && (
          <ul className={`${styles.suggestions} list-group position-absolute`}>
            {suggestions.map((s) => (
              <li
                key={s}
                className="list-group-item"
                onClick={() => {
                  setCity(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleSearch} disabled={loading} className="btn btn-primary">
        {loading ? 'Loading...' : 'Search'}
      </button>
      {city && (
      <button type="button" className={`btn btn-danger ${styles.clearButton}`} onClick={clearWeather}>
        Clear
      </button>
    )}
    </div>
    
    {errorMessage && <div className={`${styles.errorBox} alert alert-danger`}>{errorMessage}</div>}

    {weather && (
      <div className="mt-4">
        <WeatherCard data={weather} />
        {!isFavorite && (
          <button type='button' className={`btn btn-warning ${styles.favButton}`} onClick={() => addFavorite(city)}>
            Add to favorites
          </button>
        )}
      </div>
    )}
  </main>
</div>
  );
}
