import { NextResponse } from 'next/server';

export async function GET() {
  console.log('???');

  const mockData = {
    statusCode: 200,
    timestamp: new Date().toISOString(),
    data: [
      {
        goalId: 1,
        goalTitle: '프론트엔드 취업 준비',
        goalColor: '#FF6347',
        color: '#FF6347',
        progress: 65,
        createdAt: new Date().toISOString(),
        todos: [
          {
            todoId: 101,
            goalTitle: '프론트엔드 취업 준비',
            goalColor: '#FF6347',
            todoTitle: 'React 포트폴리오 만들기',
            startDate: '2024-05-01',
            endDate: '2024-05-31',
            todoStatus: 'IN_PROGRESS',
            todoLink: '',
            todoPic: '',
            createdAt: new Date().toISOString(),
            completes: [
              {
                completeId: 1001,
                completePic: '',
                note: '기본 구조 완성',
                completeLink: '',
                completeStatus: 'DONE',
                createdAt: new Date().toISOString(),
                startDate: '2024-05-01',
              },
            ],
          },
          {
            todoId: 102,
            goalTitle: '프론트엔드 취업 준비',
            goalColor: '#FF6347',
            todoTitle: 'Next.js 공부',
            startDate: '2024-05-10',
            endDate: '2024-05-20',
            todoStatus: 'TODO',
            todoLink: '',
            todoPic: '',
            createdAt: new Date().toISOString(),
            completes: [],
          },
        ],
      },
      {
        goalId: 2,
        goalTitle: 'UI 컴포넌트 라이브러리 분석',
        goalColor: '#1E90FF',
        color: '#1E90FF',
        progress: 30,
        createdAt: new Date().toISOString(),
        todos: [],
      },
    ],
  };

  return NextResponse.json(mockData);
}
