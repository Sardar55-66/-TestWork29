import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Loader from '@/components/Loader';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader onFinish={() => setLoading(false)} />;

  return <Component {...pageProps} />;
}