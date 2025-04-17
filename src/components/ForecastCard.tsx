import { ForecastItem } from "@/types/Forecast";

interface ForecastCardProps {
  data: ForecastItem
}

export default function ForecastCard({ data }: ForecastCardProps) {
  const date = new Date(data.dt_txt);
  console.log(data)

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{date.toLocaleDateString('ru-RU')}</h5>
        <p className="card-text">
          <span className="fw-bold"> Temperature- </span> {data.main.temp} °C
        </p>
        <p className="card-text">
          <span className="fw-bold">☁️ Weather- </span> {data.weather[0].description}
        </p>
      </div>
    </div>
  );
}