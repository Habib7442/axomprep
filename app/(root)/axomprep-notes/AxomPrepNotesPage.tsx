"use client";

import { useState } from "react";
import {
  classes,
  subjects,
  languages,
  filterNotes
} from "@/data/notesData";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  FileText,
  Download,
  BookOpen,
  GraduationCap,

} from "lucide-react";
import Link from "next/link";

export default function AxomPrepNotesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Filter notes based on selected filters
  const filteredNotes = filterNotes(selectedClass, selectedSubject, selectedLanguage);

  // Reset all filters
  const resetFilters = () => {
    setSelectedClass("all");
    setSelectedSubject("all");
    setSelectedLanguage("all");
  };

  return (
    <div className="min-h-screen bg-[#1a2639] bg-[url('/images/parchment-texture.jpg')] bg-blend-overlay bg-opacity-10">
      <NavBar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-teal-200 mb-4 font-serif">
              AxomPrep Study Notes
            </h1>
            <p className="text-amber-100 text-lg max-w-3xl mx-auto">
              Access comprehensive study materials for classes 8-10 in Mathematics,
              General Science, and English. Available in both English and Assamese medium.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-[#0E1A2D]/80 border border-teal-900 rounded-lg p-6 mb-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-teal-200 mb-2 text-sm font-medium">
                  Filter by Class
                </label>
                <Select
                  value={selectedClass}
                  onValueChange={(value) => setSelectedClass(value)}
                >
                  <SelectTrigger className="bg-[#0E1A2D] border-teal-700 text-amber-100">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E1A2D] border-teal-700">
                    <SelectItem value="all" className="text-amber-100">
                      All Classes
                    </SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls} className="text-amber-100">
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-teal-200 mb-2 text-sm font-medium">
                  Filter by Subject
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={(value) => setSelectedSubject(value)}
                >
                  <SelectTrigger className="bg-[#0E1A2D] border-teal-700 text-amber-100">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E1A2D] border-teal-700">
                    <SelectItem value="all" className="text-amber-100">
                      All Subjects
                    </SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-amber-100">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-teal-200 mb-2 text-sm font-medium">
                  Filter by Language
                </label>
                <Select
                  value={selectedLanguage}
                  onValueChange={(value) => setSelectedLanguage(value)}
                >
                  <SelectTrigger className="bg-[#0E1A2D] border-teal-700 text-amber-100">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E1A2D] border-teal-700">
                    <SelectItem value="all" className="text-amber-100">
                      All Languages
                    </SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language} className="text-amber-100">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full border-teal-700 text-teal-200 hover:bg-teal-900/30"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Card
                  key={note.id}
                  className="bg-[#0E1A2D]/90 border-teal-900 overflow-hidden hover:shadow-lg hover:shadow-teal-900/20 transition-all duration-300"
                >
                  <div className="h-40 relative bg-teal-900/30">
                    <div className="absolute top-0 right-0 bg-teal-800 text-white px-3 py-1 text-xs font-medium z-10">
                      {note.language}
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <FileText className="h-16 w-16 text-teal-200/50" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-teal-900/50 text-teal-200 text-xs px-2 py-1 rounded">
                        Class {note.class}
                      </div>
                      <div className="bg-amber-900/50 text-amber-200 text-xs px-2 py-1 rounded">
                        {note.subject}
                      </div>
                    </div>
                    <CardTitle className="text-teal-100">{note.title}</CardTitle>
                    <CardDescription className="text-amber-200/70">
                      {note.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center border-t border-teal-900/50 pt-4">
                    <div className="text-xs text-teal-300/70">
                      Uploaded: {new Date(note.uploadDate).toLocaleDateString()}
                    </div>
                    <Link href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        className="bg-teal-700 hover:bg-teal-600 text-white"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0E1A2D]/80 border border-teal-900 rounded-lg">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-16 w-16 text-teal-200/50" />
              </div>
              <h3 className="text-xl font-medium text-teal-100 mb-2">
                No notes found
              </h3>
              <p className="text-amber-200/70 max-w-md mx-auto">
                No notes match your current filter criteria. Try adjusting your filters or check back later for new content.
              </p>
              <Button
                onClick={resetFilters}
                className="mt-4 bg-teal-700 hover:bg-teal-600 text-white"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Contact Section */}
      <section className="bg-[#0E1A2D]/90 border-t border-teal-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-teal-200 mb-4 font-serif">
              Need Additional Study Materials?
            </h2>
            <p className="text-amber-100 mb-8">
              Visit AxomPrep Coaching Center for personalized guidance and additional study resources.
              Our experienced faculty provides comprehensive coaching for classes 8-10.
            </p>
            <Link href="/about-axomprep">
              <Button className="bg-teal-700 hover:bg-teal-600 text-white">
                <GraduationCap className="h-4 w-4 mr-2" />
                Learn More About AxomPrep
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
