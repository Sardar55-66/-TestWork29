
import { WeatherData } from '@/types/WeatherData';
import styles from '../styles/WeatherCard.module.scss'

interface WeatherCardProps {
  data: WeatherData | null;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  if (!data) return <p className="alert alert-warning">Weather data not found</p>;

  const { name, main, weather, wind } = data;
  console.log(data)

  return (
    <div className={`card ${styles.card} shadow-sm`}>
      <h2 className="card-title text-center">{name}</h2>

      <div className="card-body">
        <div className={`row ${styles.infoBlock}`}>
          <div className="col-6">
            <span className="badge badge-info">Temperature- </span>
            <span className="d-block">{main.temp} °C</span>
          </div>
          <div className="col-6">
            <span className="badge badge-info">☁️ Weather- </span>
            <span className="d-block">{weather[0].description}</span>
          </div>
          <div className="col-6">
            <span className="badge badge-info">Wind- </span>
            <span className="d-block">{wind.speed} m/s</span>
          </div>
          <div className="col-6">
            <span className="badge badge-info">Humidity- </span>
            <span className="d-block">{main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}