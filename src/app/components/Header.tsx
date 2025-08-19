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
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-gray-200 shadow-sm z-10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-text">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
