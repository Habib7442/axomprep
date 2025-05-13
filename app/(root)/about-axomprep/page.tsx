import Image from "next/image";
import FacultyImage from "../../../public/faculty.png";
import LogoImage from "../../../public/logo.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Wand2, BookOpen, GraduationCap, Award } from "lucide-react";

const AboutAxomPrep = () => {
  return (
    <div className="min-h-screen bg-[#1a2639] bg-[url('/images/parchment-texture.jpg')] bg-blend-overlay bg-opacity-10">
      {/* Main Banner Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Banner */}
        <div className="bg-[#1a2639]/80 rounded-xl shadow-2xl p-6 mb-8 border-2 border-amber-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-10 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Logo */}
            <div className="rounded-full overflow-hidden border-2 border-amber-600 bg-amber-900/30">
              <Image
                src={LogoImage}
                alt="AxomPrep Logo"
                width={128}
                height={128}
                className="object-contain p-2 rounded-full"
              />
            </div>

            {/* Center Text */}
            <div className="text-centre md:text-left flex-1">
              <h1 className="text-4xl text-center lg:text-left font-serif font-bold text-amber-400 mb-2">
                AxomPrep Coaching Center
              </h1>
              <p className="text-lg text-center lg:text-left text-amber-200 mb-4 font-serif">
                Excellence in Education - Kadong, Assam
              </p>
              <div className="bg-amber-900/60 text-center lg:text-left text-amber-200 py-2 px-6 rounded-full inline-block font-serif border border-amber-600">
                <span className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                  Admissions Open - Batch starting soon
                </span>
              </div>
            </div>
            {/* CTA Section */}
            <div className="text-center">
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 border-2 border-amber-800"
              >
                <Link href="/axomprep-enroll">Enroll Now</Link>
              </Button>
              <p className="mt-4 text-amber-300 font-serif">Limited seats available</p>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#1a2639]/80 rounded-xl shadow-lg p-6 border-2 border-amber-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-bold text-amber-400 mb-4 border-b border-amber-600/50 pb-2 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-amber-400" />
                Courses Offered
              </h2>
              <ul className="space-y-3 text-lg text-amber-200 font-serif">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Mathematics, General Science and English</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Classes: 8th, 9th, and 10th Standard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Medium: English and Assamese</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>New Batch Starts From: 10th April</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Faculty Section */}
          <div className="bg-[#1a2639]/80 rounded-xl shadow-lg p-6 border-2 border-amber-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-bold text-amber-400 mb-4 border-b border-amber-600/50 pb-2 flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-amber-400" />
                Lead Instructor
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-2 border-amber-600 bg-amber-900/30">
                  <Image
                    src={FacultyImage}
                    alt="Ashadul Islam"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-amber-300">
                    Ashadul Islam
                  </h3>
                  <p className="text-amber-200 mb-2 font-serif">B.Tech (Computer Science)</p>
                  <p className="text-amber-200 font-serif">
                    Specialized in Mathematics & Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-[#1a2639]/80 rounded-xl shadow-lg p-6 mb-8 border-2 border-amber-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold text-amber-400 mb-6 text-center border-b border-amber-600/50 pb-2 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 mr-2 text-amber-400" />
              Why Choose AxomPrep?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  icon: <Wand2 className="h-5 w-5 text-amber-400" />,
                  title: "Expert Faculty",
                  desc: "Highly qualified and experienced teachers",
                },
                {
                  icon: <Sparkles className="h-5 w-5 text-amber-400" />,
                  title: "Personalized Learning",
                  desc: "Small batch sizes for individual attention",
                },
                {
                  icon: <BookOpen className="h-5 w-5 text-amber-400" />,
                  title: "Comprehensive Material",
                  desc: "Structured notes and practice tests",
                },
                {
                  icon: <GraduationCap className="h-5 w-5 text-amber-400" />,
                  title: "Modern Infrastructure",
                  desc: "Digital classrooms and online resources",
                },
                {
                  icon: <Award className="h-5 w-5 text-amber-400" />,
                  title: "Proven Results",
                  desc: "Strong track record of student success",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-amber-900/30 rounded-lg p-4 border border-amber-600 hover:bg-amber-900/40 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    {feature.icon}
                    <h3 className="font-bold font-serif text-amber-400 ml-2">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-amber-200 text-sm font-serif">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="text-center text-amber-300 italic font-serif mb-8">
          &ldquo;Education is not the filling of a pot but the lighting of a fire.&rdquo; — W.B. Yeats
        </div>
      </main>
    </div>
  );
};

export default AboutAxomPrep;
