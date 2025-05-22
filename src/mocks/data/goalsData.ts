import { TodosOfGoalsResponse } from '@/types/Dashboard';

export const generateMockTodosOfGoals = (
  cursor: number,
  size: number,
): TodosOfGoalsResponse => {
  const totalItems = 20;
  const startId = cursor || 0;
  const endId = Math.min(startId + size, totalItems);

  const today = new Date();
  const daysOffset = 4;

  const goals = Array.from({ length: endId - startId }, (_, i) => {
    const id = startId + i + 1;
    const goalColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return {
      goalId: id,
      goalTitle: `목표 ${id}`,
      goalColor,
      color: goalColor,
      progress: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      todos: Array.from({ length: 2 }, (_, j) => {
        const todoId = id * 10 + j;

        const startDate = new Date(today);
        startDate.setDate(today.getDate() - daysOffset);
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + daysOffset);

        const completeLength = Math.floor(Math.random() * 9) + 2;

        const completes = Array.from({ length: completeLength }, (_, k) => {
          const completeDate = new Date(startDate);
          completeDate.setDate(startDate.getDate() + k);

          const isPast = completeDate <= today;

          return {
            completeId: todoId * 100 + k,
            completePic: isPast
              ? `https://picsum.photos/id/${(todoId * 100 + k) % 100}/300/500`
              : '',
            note: isPast ? `완료 노트 ${k + 1}` : '',
            completeLink: '',
            completeStatus: isPast ? '인증' : 'TODO',
            createdAt: completeDate.toISOString(),
            startDate: completeDate.toISOString(),
          };
        });

        const isTodoDone = today >= endDate;

        return {
          todoId,
          goalTitle: `목표 ${id}`,
          goalColor,
          todoTitle: `할 일 ${todoId}`,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          todoStatus: isTodoDone ? 'DONE' : 'IN_PROGRESS',
          todoLink: '',
          todoPic: isTodoDone
            ? `https://picsum.photos/id/${todoId % 100}/300/300`
            : '',
          createdAt: new Date().toISOString(),
          completes,
        };
      }),
    };
  });

  const hasMore = endId < totalItems;

  return {
    statusCode: 200,
    timestamp: new Date().toISOString(),
    data: {
      content: goals,
      empty: goals.length === 0,
      first: startId === 0,
      last: !hasMore,
      nextCursor: hasMore ? endId : 0,
      number: startId / size,
      numberOfElement: goals.length,
      pageable: {
        offset: startId,
        pageNumber: startId / size,
        paged: true,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        unpaged: false,
      },
      size,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
    },
  };
};
