import { NextResponse } from 'next/server';

export async function GET() {
  const today = new Date();
  const getDate = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString();
  };

  const todos = Array.from({ length: 3 }, (_, i) => {
    const todoId = 100 + i;
    const goalColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return {
      todoId,
      goalTitle: `목표 ${i + 1}`,
      goalColor,
      todoTitle: `할 일 ${i + 1}`,
      startDate: getDate(-3),
      endDate: getDate(3),
      todoStatus: i % 2 === 0 ? 'IN_PROGRESS' : 'TODO',
      todoLink: '',
      todoPic: i % 2 === 0 ? `https://picsum.photos/id/${10 + i}/300/300` : '',
      createdAt: new Date().toISOString(),
      completes: [],
    };
  });

  const mockData = {
    statusCode: 200,
    timestamp: new Date().toISOString(),
    data: todos,
  };

  return NextResponse.json(mockData);
}
