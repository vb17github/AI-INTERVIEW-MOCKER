import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription) {
      return new Response(JSON.stringify({ error: "Job description is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Suggest 5 high-quality online courses relevant to this job description: "${jobDescription}". Format each course as "[Course Name](Course URL)".`;

    const response = await model.generateContent(prompt);
    const text = await response.response.text(); // Await text content

    const recommendations = text.split("\n").filter((line) => line.trim() !== "");

    return new Response(JSON.stringify({ recommendations }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching course recommendations:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
