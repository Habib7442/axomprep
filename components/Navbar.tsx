"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const { plan, loading } = useBilling();

  // Get plan display name
  const getPlanDisplayName = () => {
    switch (plan) {
      case 'free': return 'Free';
      case 'basic': return 'Basic Core Learner';
      case 'pro': return 'Pro Companion';
      default: return 'Free';
    }
  };

  // Get plan color
  const getPlanColor = () => {
    switch (plan) {
      case 'free': return 'bg-gray-200 text-gray-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Wait for both user and billing data to load
  if (!isLoaded || loading) {
    return (
      <nav className="navbar">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="md:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={36} height={34} />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent max-sm:text-lg">
              AxomPrep
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Features button for large devices */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-gray-100">
                <Sparkles className="h-4 w-4" />
                <span>Features</span>
              </button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[300px] sm:w-[320px] p-0"
            >
              <SheetHeader className="border-b border-gray-200 p-4">
                <SheetTitle className="sr-only">Features Menu</SheetTitle>
                <div className="flex items-center gap-2">
                  <Image src="/images/logo.png" alt="logo" width={32} height={30} />
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    AxomPrep Features
                  </span>
                </div>
              </SheetHeader>
              <div className="flex flex-col h-full py-4">
                <div className="flex-1 px-2">
                  <div className="space-y-2">
                    <SheetClose asChild>
                      <Link href="/companions">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100">
                          <span className="font-medium">AI Tutors</span>
                        </div>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/interview">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100">
                          <span className="font-medium">Interview Practice</span>
                        </div>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/common-interview">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100">
                          <span className="font-medium">Common Interview</span>
                        </div>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/stories">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100">
                          <span className="font-medium">Stories</span>
                        </div>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <NavItems />
          <SignedOut>
            <SignInButton>
              <button className="btn-signin text-sm">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
              {plan !== 'free' && (
                <Link 
                  href="/subscription" 
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getPlanColor()}`}
                >
                  {getPlanDisplayName()}
                </Link>
              )}
              <UserButton />
            </div>
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
            {plan !== 'free' && (
              <Link 
                href="/subscription" 
                className={`text-xs px-2 py-1 rounded-full font-medium ${getPlanColor()}`}
              >
                {getPlanDisplayName()}
              </Link>
            )}
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
                      AxomPrep
                    </span>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex flex-col h-full py-4">
                <div className="flex-1 px-2">
                  <SheetClose asChild>
                    <NavItems />
                  </SheetClose>
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
                        {plan !== 'free' && (
                          <Link 
                            href="/subscription" 
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getPlanColor()}`}
                          >
                            {getPlanDisplayName()}
                          </Link>
                        )}
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