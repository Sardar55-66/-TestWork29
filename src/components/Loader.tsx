import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.scss';

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish
    });

    tl.to(loaderRef.current, {
      duration: 1,
      opacity: 0,
      y: -100,
      ease: 'power3.inOut'
    });
  }, []);

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
}
