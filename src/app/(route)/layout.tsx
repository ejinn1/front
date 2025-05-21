import { ReactNode } from 'react';

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
      {/* <Suspense fallback={<Spinner />}>
        <ServerFetchBoundary fetchOptions={goalsOptions(token)}>
          <Sidebar />
        </ServerFetchBoundary>
      </Suspense> */}
      {children}
    </div>
  );
}
