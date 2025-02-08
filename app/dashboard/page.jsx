"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, Filter } from "lucide-react";
import InterviewItemCard from "./_components/InterviewItemCard";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [interviewList, setInterviewList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    user && fetchInterviews();
  }, [user, darkMode]);

  const fetchInterviews = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
  };

  return (
    <div className={`min-h-screen p-6 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="flex justify-between items-center pb-6 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Mock Interviews</h1>
        <div className="flex gap-4">
          <Input
            icon={<Search />}
            placeholder="Search by job role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewList
          .filter((interview) => interview.jobPosition.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
