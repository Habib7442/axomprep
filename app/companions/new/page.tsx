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
  
  // If user cannot create a companion, redirect to limit reached page
  if (!canCreateCompanion) {
    redirect("/limit-reached");
  }

  return (
    <div className="w-full py-8 md:py-12 bg-gradient-to-br from-[#EEF2FF] via-[#F8F9FB] to-[#FEF3C7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2E8F0] shadow-lg p-6 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
            AI Tutor Builder
          </h1>
          <p className="text-[#4B5563] mb-8 text-lg">
            Create your personalized AI Tutor for focused learning
          </p>
          <CompanionForm />
        </div>
      </div>
    </div>
  );
};

export default NewCompanion;