export default async function handler(req, res) {
    const { query } = req.query; // Get the search keyword
  
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
  
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Get API key from .env.local
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.error) {
        return res.status(500).json({ error: data.error.message });
      }
  
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
