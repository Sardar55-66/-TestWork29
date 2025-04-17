import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchForecast } from '../lib/api';
import { useWeatherStore } from '../store/weatherStore';
import { ForecastItem } from '@/types/Forecast';
import styles from '../styles/Forecast.module.scss';
import ForecastCard from '@/components/ForecastCard';

type CityForecast = {
  city: string;
  list: ForecastItem[];
};

export default function Forecast() {
  const [forecastData, setForecastData] = useState<CityForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { favorites, hasHydrated } = useWeatherStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const loadForecasts = async () => {
      if (favorites.length === 0) {
        setError('No city selected. Add city to favorites on the main page.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const results: CityForecast[] = await Promise.all(
          favorites.map(async (city) => {
            const data = await fetchForecast(city);
            const list = data.list.filter((_: ForecastItem, index: number) => index % 8 === 0);
            return { city, list };
          })
        );
        setForecastData(results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error loading forecast:', err.message);
        }
        setError('Failed to load forecast. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadForecasts();
  }, [hasHydrated, favorites]);

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} d-flex justify-content-between align-items-center p-3`}>
        <h1 className="mb-0">5 Day Forecast</h1>
        <nav className="d-flex gap-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          <Link href="/favorites" className="text-decoration-none">Favorites {favorites.length}</Link>
        </nav>
      </header>

      <main className={`${styles.main} container`}>
        {loading && <p className="alert alert-info">Forecast loading...</p>}
        {!hasHydrated && <p className="alert alert-secondary">Getting ready...</p>}
        {error && <div className={`${styles.errorBox} alert alert-danger`}>{error}</div>}

        {!loading && !error && forecastData.length > 0 && (
          <>
            {forecastData.map(({ city, list }, cityIndex) => (
                <section key={cityIndex} className="mb-5">
                    <h2 className="city">{city}</h2>
                    <div className={styles.scrollContainer}>
                    {list.map((item, index) => (
                        <div key={index} className={styles.forecastCard}>
                        <ForecastCard data={item} />
                        </div>
                    ))}
                    </div>
                </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
