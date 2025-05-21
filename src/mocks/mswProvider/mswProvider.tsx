'use client';

import { useEffect, useState } from 'react';

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mockingEnabled = !!process.env.NEXT_PUBLIC_API_MOCKING;
  const [shouldRender, setShouldRender] = useState(!mockingEnabled);

  useEffect(() => {
    if (mockingEnabled) {
      import('../initialize').then(async ({ initMSW }) => {
        await initMSW();
        setShouldRender(true);
      });
    }
  }, []);

  return shouldRender ? <>{children}</> : <></>;
}
