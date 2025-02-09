import { NextResponse } from "next/server";

// Dummy function to generate a new question (Replace with real logic)
const generateNewQuestion = (jobRole) => {
  const sampleQuestions = {
    "Software Engineer": [
      "What is polymorphism in OOP?",
      "Explain the CAP theorem.",
      "How does garbage collection work in Java?",
    ],
    "Data Scientist": [
      "What is a confusion matrix?",
      "Explain PCA (Principal Component Analysis).",
      "What is the curse of dimensionality?",
    ],
  };
  
  const questions = sampleQuestions[jobRole] || ["Describe yourself in one word."];
  return questions[Math.floor(Math.random() * questions.length)];
};

// Handle POST request
export async function POST(req) {
  try {
    const { jobRole } = await req.json();
    if (!jobRole) {
      return NextResponse.json({ error: "Missing job role" }, { status: 400 });
    }

    const newQuestion = generateNewQuestion(jobRole);
    return NextResponse.json({ question: newQuestion });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
