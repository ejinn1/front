export interface CompleteTypes {
  completeId: number;
  completePic: string;
  note: string;
  completeLink: string;
  completeStatus: string;
  createdAt: string;
  startDate: string;
}

export interface TodoTypes {
  todoId: number;
  goalTitle: string;
  goalColor: string;
  todoTitle: string;
  startDate: string;
  endDate: string;
  todoStatus: string;
  todoLink: string;
  todoPic: string;
  createdAt: string;
  completes: CompleteTypes[];
}

export interface GoalTypes {
  goalId: number;
  goalTitle: string;
  goalColor: string;
  progress: number;
  createdAt: string;
  color: string;
  todos: TodoTypes[];
}

export interface ProgressTypes {
  progress: number;
}