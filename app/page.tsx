import React from "react";
import Link from "next/link";

const HomePage = () => {
  const classes = [
    { 
      name: "Class 9", 
      description: "Foundation for board exams", 
      icon: "📚",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      name: "Class 10", 
      description: "Board exam preparation", 
      icon: "🎯",
      color: "bg-green-100 text-green-800"
    },
    { 
      name: "Class 11", 
      description: "Higher secondary education", 
      icon: "📈",
      color: "bg-yellow-100 text-yellow-800"
    },
    { 
      name: "Class 12", 
      description: "Final board exams", 
      icon: "🎓",
      color: "bg-red-100 text-red-800"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to CBSE Learning Portal</h1>
        <p className="text-xl text-gray-600">Select your class to begin your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classes.map((classItem, index) => (
          <Link 
            key={index} 
            href={`/class${classItem.name.split(' ')[1]}`}
            className={`block p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${classItem.color}`}
          >
            <div className="text-6xl mb-6">{classItem.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{classItem.name}</h2>
            <p className="mb-6">{classItem.description}</p>
            <button className="w-full py-2 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition-colors">
              Select Class
            </button>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Learning Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold mb-2">Voice-Based Learning</h3>
            <p className="text-gray-600">Interactive voice tutoring for better understanding and retention</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Detailed analytics to monitor your learning progress</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
            <p className="text-gray-600">Compete with peers and stay motivated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;