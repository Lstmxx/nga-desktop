'use client';

import { useCallback, useEffect } from 'react';

export default function Greet() {
  const cb = useCallback(async () => {
    const invoke = (await import('@tauri-apps/api')).invoke;
    invoke<string>('greet', { name: 'Next.js' }).then(console.log).catch(console.error);
  }, []);

  useEffect(() => {
    if (cb) {
      cb();
    }
  }, [cb]);

  return <></>;
}
