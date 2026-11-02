'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Toaster.module.css';

export default function Toaster() {
  const [msg, setMsg] = useState(null);
  const timer = useRef();

  useEffect(() => {
    const on = (e) => {
      setMsg({ text: e.detail, key: Date.now() });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener('bk:toast', on);
    return () => window.removeEventListener('bk:toast', on);
  }, []);

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {msg && (
        <div key={msg.key} className={styles.toast}>
          <span className={styles.prompt}>&gt;</span> {msg.text}
        </div>
      )}
    </div>
  );
}
