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
      <div className="relative mx-auto h-full max-w-md px-4 flex items-center justify-center">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
