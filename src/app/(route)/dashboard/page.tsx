import { cookies } from 'next/headers';

import { Header } from '@/components/common/Header';
import { PageContainer } from '@/components/common/PageContainer';
import { Follower } from '@/components/Dashboard/Follower';

export default async function DashBoardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  return (
    <>
      <Header title="대시보드" />
      <PageContainer>
        <Follower />
        {/* <Suspense fallback={<TodoListSkeleton />}>
          <ServerFetchBoundary fetchOptions={recentTodosOptions(token)}>
            <RecentTodos />
          </ServerFetchBoundary>
        </Suspense>
        <MyProgress />
        <GoalList /> */}
      </PageContainer>
    </>
  );
}
