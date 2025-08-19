'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, FileText } from 'react-feather';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Timeline', icon: Home },
    { href: '/map', label: 'Map View', icon: Map },
    { href: '/documents', label: 'Documents', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 shadow-md">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            key={label}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm ${
              pathname === href ? 'text-accent' : 'text-gray-500'
            }`}
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
