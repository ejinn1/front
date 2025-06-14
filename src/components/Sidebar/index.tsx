'use client';

import {
  FaAnglesLeft,
  FaBars,
  FaChartSimple,
  FaFire,
  FaFlag,
  FaListUl,
  FaMagnifyingGlass,
} from 'react-icons/fa6';

import { usePathname, useRouter } from 'next/navigation';

import LogoIcon from '@/assets/svg/svg-logo-icon.svg';
import LogoSide from '@/assets/svg/svg-logo-side.svg';
import { GoalList } from '@/components/Sidebar/GoalList';
import { MenuItem } from '@/components/Sidebar/MenuItem';
import { Profile } from '@/components/Sidebar/Profle';
import { SidebarButton } from '@/components/Sidebar/SidebarButton';
import { useGoalsQuery } from '@/hooks/apis/useGoalsQuery';
import { useNewGoalsStore } from '@/store/useNewGoalStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useTodoModalStore } from '@/store/useTodoModalStore';

import { cn } from '@/utils/className';

const Sidebar = () => {
  const router = useRouter();
  const path = usePathname();

  const { goals } = useGoalsQuery();

  const { isOpen, open, close } = useSidebarStore();
  const { open: openModal } = useTodoModalStore();

  const handleToggle = useNewGoalsStore((state) => state.toggleIsNew);

  const sidebarClass = cn(
    'fixed md:sticky top-0 left-0 z-20 flex flex-col items-center h-screen py-16 transition-all duration-200 ease-in-out bg-white border-r border-custom-white-200',
    isOpen ? 'md:max-w-280 w-screen' : 'w-0 md:min-w-60 overflow-hidden',
  );

  const iconContainerClass = cn(
    isOpen
      ? 'flex w-full items-center justify-between px-16'
      : 'flex flex-col gap-16',
  );

  const recentGoals = goals
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className={sidebarClass}>
      <div className={iconContainerClass}>
        <div
          onClick={() => {
            router.push('/dashboard');
            close();
          }}
        >
          <span className="cursor-pointer">
            {isOpen ? <LogoSide /> : <LogoIcon />}
          </span>
        </div>
        {isOpen ? (
          <FaAnglesLeft
            className="size-28 cursor-pointer p-4 text-custom-gray-100"
            onClick={close}
          />
        ) : (
          <FaBars
            className="size-28 cursor-pointer p-4 text-custom-gray-100"
            onClick={open}
          />
        )}
        {path === '/follows' && !isOpen && (
          <FaMagnifyingGlass
            className="size-28 cursor-pointer p-4 text-primary-100"
            onClick={() => {
              router.push('/search');
            }}
          />
        )}
      </div>
      {isOpen && (
        <div className="flex w-full flex-col items-center">
          <Profile />
          <MenuItem
            icon={<FaChartSimple className="size-28 p-4" />}
            label="홈"
            onClick={() => {
              router.push('/dashboard');
              close();
            }}
          />
          <MenuItem
            icon={<FaFlag className="size-28 p-4" />}
            label="목표"
            addButton={
              <SidebarButton type="default" onClick={handleToggle}>
                새 목표
              </SidebarButton>
            }
            onClick={() => {
              router.push('/goals');
              close();
            }}
          />
          <GoalList goals={recentGoals} />
          <MenuItem
            icon={<FaListUl className="size-28 p-4" />}
            label="내 할일"
            addButton={
              <SidebarButton
                type="invert"
                disabled={goals.length === 0}
                onClick={() => {
                  close();
                  openModal('생성');
                }}
              >
                새 할일
              </SidebarButton>
            }
            onClick={() => {
              router.push('/todos');
              close();
            }}
          />
          <MenuItem
            icon={<FaFire className="size-28 p-4" />}
            label="팔로워"
            onClick={() => {
              router.push('/follows');
              close();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
