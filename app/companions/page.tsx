import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  try {
    const companions = await getAllCompanions({ subject, topic });
    console.log(companions, "companions");

    if (!companions) {
      return <div>No companions found.</div>;
    }

    return (
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>AI Companion Library</h1>
          <div className="flex gap-4">
            <SearchInput />
            <SubjectFilter />
          </div>
        </section>
        <section className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error fetching companions:", error);
    return <div>Error loading companions</div>;
  }
};

export default CompanionsLibrary;
