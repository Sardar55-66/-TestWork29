export interface ForecastItem {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
    }[];
    wind: {
      speed: number;
    };
  }  