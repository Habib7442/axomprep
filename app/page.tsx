import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl">Popular Companion</h1>
      <section className="home-section">
        <CompanionCard
          id="1"
          name="Neura the Brainy Explorer"
          topic="Neural Network of Brain"
          subject="science"
          duration={45}
          color="#007bff"
        />
        <CompanionCard
          id="2"
          name="Mathilda the Mathemagician"
          topic="Calculus and Beyond"
          subject="math"
          duration={60}
          color="#28a745"
        />
        <CompanionCard
          id="3"
          name="Luna the Linguist"
          topic="Language Arts and Composition"
          subject="language"
          duration={30}
          color="#ffc107"
        />
      </section>
      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
