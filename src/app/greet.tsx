'use client';
import { invoke } from '@tauri-apps/api/tauri';
import { useCallback, useEffect } from 'react';

export default function Greet() {
  const cb = useCallback(async () => {
    invoke<string>('greet', { name: 'Next.js' }).then(console.log).catch(console.error);
  }, []);

  useEffect(() => {
    if (cb) {
      cb();
    }
  }, [cb]);

  return <></>;
}
