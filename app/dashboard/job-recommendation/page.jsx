"use client";

const CLIENT_ID = "8669b8hnjxe09y";
const REDIRECT_URI = "http://localhost:3000/api/auth/linkedin";

const handleLinkedInLogin = () => {
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=r_liteprofile%20r_emailaddress%20r_organization_social`;
};

export default function JobRecommendation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Job Recommendations</h1>
      <button 
        onClick={handleLinkedInLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Login with LinkedIn
      </button>
    </div>
  );
}
