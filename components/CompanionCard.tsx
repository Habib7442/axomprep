"use client";

import { addBookmark, isCompanionBookmarked, removeBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const pathname = usePathname();

  // Check if the companion is bookmarked when the component mounts
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarked = await isCompanionBookmarked(id);
        setIsBookmarked(bookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [id]);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        // Remove bookmark
        await removeBookmark(id, pathname);
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await addBookmark(id, pathname);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
            alt={isBookmarked ? "bookmarked" : "bookmark"}
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
        <p className="text-sm">{duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">Launch Lesson</button>
      </Link>
    </article>
  );
};

export default CompanionCard;