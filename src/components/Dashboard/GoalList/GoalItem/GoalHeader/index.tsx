import { FaFlag, FaPlus } from 'react-icons/fa6';

import { useTodoDataStore } from '@/store/useTodoDataStore';
import { useTodoModalStore } from '@/store/useTodoModalStore';

interface GoalHeaderProps {
  id: number;
  title: string;
  color: string;
}

export const GoalHeader = ({ id, title, color }: GoalHeaderProps) => {
  const openModal = useTodoModalStore((state) => state.open);
  const setTodoData = useTodoDataStore((state) => state.setTodoData);

  const handleClick = () => {
    openModal('생성');
    setTodoData({ goalId: id, goalTitle: title });
  };

  return (
    <>
      <span className="inline-flex items-center text-base-semibold">
        <FaFlag className="mr-4 size-24 p-2" style={{ fill: color }} />
        {title}
      </span>
      <button
        onClick={handleClick}
        className="absolute right-16 top-16 flex items-center text-primary-100"
      >
        <FaPlus className="size-24 p-4" />
        <span className="text-sm-semibold">할일 추가</span>
      </button>
    </>
  );
};
