"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "AI Tutors", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathName = usePathname();
  
  return (
    <>
      {/* Desktop view - horizontal layout */}
      <nav className="hidden md:flex items-center gap-4">
        {navItems.map(({ label, href }) => (
          <Link 
            href={href} 
            key={label} 
            className={cn(
              "px-3 py-2 rounded-md hover:bg-gray-100 transition-colors",
              pathName === href ? "text-orange-500 font-semibold" : "text-gray-700"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      
      {/* Mobile view - vertical layout for Sheet */}
      <nav className="md:hidden flex flex-col gap-2">
        {navItems.map(({ label, href }) => (
          <Link 
            href={href} 
            key={label} 
            className={cn(
              "px-3 py-3 rounded-md hover:bg-gray-100 transition-colors text-lg",
              pathName === href ? "text-orange-500 font-semibold" : "text-gray-700"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default NavItems;