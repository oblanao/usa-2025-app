"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText } from "react-feather";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/trip", label: "Trip Details", icon: Briefcase },
    { href: "/documents", label: "Documents", icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-accent text-white shadow-lg z-[100] pb-6 pt-2">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            key={label}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm ${
              pathname === href ? "text-white font-bold" : "text-white/70"
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
