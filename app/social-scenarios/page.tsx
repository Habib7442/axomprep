import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import SocialScenariosClient from './SocialScenariosClient';
import { redirect } from 'next/navigation';

const SocialScenariosPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <SocialScenariosClient />
    </div>
  );
};

export default SocialScenariosPage;