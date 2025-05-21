'use client';

import { useEffect } from 'react';

import { enableMocking } from '@/mocks/initialize';

export default function InitMSW() {
  useEffect(() => {
    enableMocking();
  }, []);

  return null;
}
