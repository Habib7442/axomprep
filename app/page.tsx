'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeLayout from './home-layout';

export default function HomePage() {
  return (
    <HomeLayout>
      <div>
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Learn Math Through{" "}
            <span className="text-yellow-400">Interactive Games</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            MathQuest makes learning mathematics fun and engaging with
            interactive lessons, challenges, and rewards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white px-8"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose MathQuest?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="bg-yellow-400 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Interactive Learning
              </h3>
              <p className="text-gray-300">
                Engage with interactive lessons and games designed to make
                learning math fun and effective.
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="bg-yellow-400 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Track Progress
              </h3>
              <p className="text-gray-300">
                Monitor your learning journey with detailed progress tracking,
                achievements, and rewards.
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="bg-yellow-400 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Gamified Experience
              </h3>
              <p className="text-gray-300">
                Earn XP, level up, and unlock achievements as you master
                mathematical concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Math Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of students who are mastering math concepts through
            interactive learning.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </HomeLayout>
  );
}
