"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query);
  const [subjects, setSubjects] = useState<string[]>([]);

  // Fetch distinct subjects from the database
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/companions/subjects');
        const data = await response.json();
        setSubjects(data.subjects || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        // Fallback to some common subjects if API fails
        setSubjects(["maths", "science", "english", "history", "geography"]);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subjectItem) => (
          <SelectItem key={subjectItem} value={subjectItem} className="capitalize">
            {subjectItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;