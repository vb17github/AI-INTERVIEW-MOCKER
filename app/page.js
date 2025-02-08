import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col md:flex-row items-center justify-center">
      {/* Header Section */}
      <div className="text-center text-white ">
        <h1 className="text-6xl font-bold mb-4">AI Mock Interviewer </h1>
        <p className="text-xl text-gray-400 mb-8 p-6 md:p-12">
        Ace your next job interview with our AI-powered mock interviews! Get instant feedback, real-time practice, and expert-level insights to boost your confidence and performance.
        </p>

        <a href="/dashboard" target="_blank"><button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/50">
          Join Us.
        </button>
        </a>
      </div>

      {/* Display Section */}
      
    </div>
  );
}
