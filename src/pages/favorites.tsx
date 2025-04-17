import Link from 'next/link';
import { useWeatherStore } from '../store/weatherStore';
import styles from '../styles/Home.module.scss'

export default function Favorites() {
  const favorites = useWeatherStore((state) => state.favorites);
  const clearFavorites = useWeatherStore((state) => state.clearFavorites);

  return (
    <div className={`${styles.wrapper} container`}>
        <header className={`${styles.header} d-flex justify-content-between align-items-center p-3`}>
            <h1 className="mb-0">Favorite cities</h1>
            <nav className="d-flex gap-3">
            <Link href="/" className="text-decoration-none">Home</Link>
            <Link href="/forecast" className="text-decoration-none">Forecast</Link>
            </nav>
        </header>

  <main className={styles.main}>
    {favorites.length === 0 ? (
      <p className="alert alert-info">You do not have any favorite cities yet.</p>
    ) : (
      <>
        <ul className="list-group">
          {favorites.map((city: string, index: number) => (
            <li key={index} className="list-group-item">{city}</li>
          ))}
        </ul>
        <button type="button" onClick={clearFavorites} className={`btn btn-danger ${styles.favButton}`}>
          Clear favorites
        </button>
      </>
    )}
  </main>
</div>

  );
}
