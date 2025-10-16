"use client";

import React, { useEffect } from "react";
import CompanionForm from "@/components/CompanionForm";

const NewCompanionClient = () => {
  useEffect(() => {
    // Initialize trial for new users
    const initializeTrial = async () => {
      try {
        const response = await fetch('/api/user/trial', { method: 'POST' });
        const data = await response.json();
        
        if (data.success) {
          console.log('Trial initialized:', data.message);
        } else {
          console.log('Trial initialization failed or already exists:', data.error || data.message);
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