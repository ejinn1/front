import { ReactNode, Suspense } from 'react';

import { Spinner } from '@/components/common/Spinner';
import { goalsOptions } from '@/hooks/apis/useGoalsQuery';
import { ServerFetchBoundary } from '@/lib/query/ServerFetchBoundary';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Sidebar = dynamic(() => import('@/components/Sidebar'));

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  return (
    <div className="flex">
      <Suspense fallback={<Spinner />}>
        <ServerFetchBoundary fetchOptions={goalsOptions(token)}>
          <Sidebar />
        </ServerFetchBoundary>
      </Suspense>
      {children}
    </div>
  );
}
