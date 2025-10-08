import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the perfect plan for your learning journey
          </p>
        </div>
        <PricingTable />
      </div>
    </main>
  );
};

export default Subscription;
