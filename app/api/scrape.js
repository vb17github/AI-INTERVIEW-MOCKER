import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { jobDescription } = await req.json();
    if (!jobDescription) {
      return new Response(JSON.stringify({ error: "Job description is required" }), { status: 400 });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
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
      return links.slice(0, 5); // Get top 5 links
    });

    await browser.close();

    return new Response(JSON.stringify({ courses }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
