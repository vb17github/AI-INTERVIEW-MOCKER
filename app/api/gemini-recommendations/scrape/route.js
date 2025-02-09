import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { jobDescription } = await req.json();
    if (!jobDescription) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 });
    }

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Google search query for courses
    const searchQuery = `best ${jobDescription} courses site:coursera.org OR site:udemy.com OR site:edx.org OR site:youtube.com`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    const courses = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll("a").forEach((link) => {
        const title = link.innerText.trim();
        const url = link.href;
        if (url.startsWith("http") && !url.includes("google.com")) {
          links.push({ title, url });
        }
      });
      return links.slice(0, 5); // Return top 5 links
    });

    await browser.close();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
