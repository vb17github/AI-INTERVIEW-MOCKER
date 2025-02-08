"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RecommendedCourses() {
  const [jobDescription, setJobDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendedCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Recommended Courses</h2>
      <p className="text-gray-600 mb-2">
        Enter a job description, and AI will suggest relevant courses.
      </p>

      <textarea
        className="w-full p-3 border rounded-md mt-2 text-gray-700"
        rows={4}
        placeholder="Enter job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <Button className="mt-4 w-full" onClick={fetchRecommendedCourses} disabled={loading}>
        {loading ? "Fetching..." : "Get Recommendations"}
      </Button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        {courses.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {courses.map((course, index) => (
              <li key={index}>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {course.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
}
