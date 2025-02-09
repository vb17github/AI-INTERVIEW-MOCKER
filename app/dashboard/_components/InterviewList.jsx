"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  
  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      console.log(
        "🚀 ~ file: InterviewList.jsx:14 ~ GetInterviewList ~ result:",
        result
      );
      setInterviewList(result);
    } catch (error) {
      console.error("Failed to fetch interview list:", error);
    }
  };

  // Function to regenerate questions
  const regenerateQuestions = async (mockId) => {
    try {
      const response = await fetch("/api/generateQuestion", {
        method: "POST",
        body: JSON.stringify({ mockId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Questions regenerated successfully!");
        // You can refresh interview details here if needed
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to regenerate questions:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {InterviewList &&
          InterviewList.map((interview, index) => (
            <InterviewItemCard
              key={index}
              interview={interview}
              onRegenerateQuestions={regenerateQuestions} // Pass the function as a prop
            />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
