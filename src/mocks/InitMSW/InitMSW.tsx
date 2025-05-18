'use client';

import { enableMocking } from '@/mocks/initialize';
import { useEffect } from 'react';

export default function InitMSW() {
  useEffect(() => {
    enableMocking();
  }, []);

  return null;
}
