"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function JobRecommendationPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Job Recommendations</h1>
      <p>Connect your LinkedIn to get personalized job recommendations.</p>

      {!session ? (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => signIn("linkedin")}
        >
          Connect LinkedIn
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-lg">Welcome, {session.user.name}!</p>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
