'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'react-feather';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-accent-light text-white shadow-lg z-[100] backdrop-blur-sm">
      <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex-1">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="p-1 rounded-full hover:bg-white/20"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex-1" />
      </div>
    </header>
  );
};

export default Header;
