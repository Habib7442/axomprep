"use client";

import React, { useEffect } from "react";
import CompanionForm from "@/components/CompanionForm";
import { initializeUserTrial } from "@/lib/actions/companion.actions";

const NewCompanionClient = () => {
  useEffect(() => {
    // Initialize trial for new users
    const initializeTrial = async () => {
      try {
        const result = await initializeUserTrial();
        
        if (result.success) {
          console.log('Trial initialized:', result.message);
        } else {
          console.log('Trial initialization failed or already exists:', result.error || result.message);
        }
      } catch (error) {
        console.error('Error initializing trial:', error);
      }
    };

    initializeTrial();
  }, []);

  return <CompanionForm />;
};

export default NewCompanionClient;