import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={36} height={34} />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent max-sm:text-lg">
              RehearsAI
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavItems />
          <SignedOut>
            <SignInButton>
              <button className="btn-signin text-sm">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        
        {/* Mobile Navigation - Sheet */}
        <div className="md:hidden flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="btn-signin text-xs px-3 py-1.5">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[320px] bg-white border-l border-gray-200 p-0"
            >
              <SheetHeader className="border-b border-gray-200 p-4">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/images/logo.png" alt="logo" width={32} height={30} />
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      RehearsAI
                    </span>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex flex-col h-full py-4">
                <div className="flex-1 px-2">
                  <NavItems />
                </div>
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <SignedOut>
                      <SignInButton>
                        <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF914D] hover:from-[#FF844B] hover:to-[#FFB088] text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg transition-all duration-300 text-sm">
                          Sign In
                        </button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center gap-2">
                        <UserButton />
                        <span className="text-sm text-gray-600">Account</span>
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;