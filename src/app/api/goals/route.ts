import { NextResponse } from 'next/server';

export async function GET() {
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
        todos: [],
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
