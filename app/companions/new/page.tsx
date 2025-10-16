import React from "react";
import CompanionForm from "@/components/CompanionForm";
import Image from "next/image";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const user = await currentUser();
  
  // If user is not authenticated, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
  }

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <div className="w-full py-8 md:py-12 bg-gradient-to-br from-[#EEF2FF] via-[#F8F9FB] to-[#FEF3C7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {canCreateCompanion ? (
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2E8F0] shadow-lg p-6 md:p-8 lg:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
              AI Tutor Builder
            </h1>
            <p className="text-[#4B5563] mb-8 text-lg">
              Create your personalized AI Tutor for focused learning
            </p>
            <CompanionForm />
          </div>
        ) : (
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2E8F0] shadow-lg p-8 md:p-12 text-center">
            <div className="mb-6">
              <Image
                src="/images/limit-reached.svg"
                alt="Companion limit reached"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
              AI Tutor Limit Reached
            </h2>
            <p className="text-[#4B5563] mb-6 text-lg leading-relaxed">
              You&apos;ve reached the maximum number of AI Tutors for your current plan.
              Upgrade to create more AI Tutors and access premium features.
            </p>
            <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:from-[#FF844B] hover:to-[#FFB088] transition-all shadow-lg">
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCompanion;