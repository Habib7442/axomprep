import React from 'react';
import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8F9FB] to-[#FEF3C7] py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                        Start building interview confidence with our AI-powered coaching platform
                    </p>
                </div>
                
                <div className="max-w-5xl mx-auto">
                    <PricingTable />
                </div>
            </div>
        </div>
    )
}

export default Subscription;