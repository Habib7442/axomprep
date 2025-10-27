"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import TestimonialForm from "@/components/TestimonialForm";
import Image from "next/image";

interface Testimonial {
  id: string;
  created_at: string;
  user_name: string;
  user_email: string | null;
  user_image_url: string | null;
  testimonial: string;
  rating: number;
  is_published: boolean;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who have enhanced their interview skills
              with our AI-powered platform.
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg">Loading testimonials...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {testimonials.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No testimonials yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to share your experience with our platform!
                  </p>
                </div>
              ) : (
                testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="flex-shrink-0">
                          {testimonial.user_image_url ? (
                            <Image
                              src={testimonial.user_image_url}
                              alt={testimonial.user_name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover w-20 h-20"
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF914D] rounded-full w-20 h-20 flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">
                                {testimonial.user_name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {testimonial.user_name}
                              </h3>
                              <div className="mt-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(
                                testimonial.created_at
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          <p className="mt-4 text-gray-700 italic">
                            &quot;{testimonial.testimonial}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                  Share Your Experience
                </h2>
                <TestimonialForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
