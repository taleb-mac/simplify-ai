"use server";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const link = data.link;
    
    if (!link) {
        throw new Error("No link provided.");
    }

    try {
        const text = await getText(link);
        return new NextResponse(JSON.stringify({ text: text }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({ status: "error", data: error }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

const getText = async (link) => {
    // Call your function to fetch transcript using YouTube API here
    const transcript = await fetchTranscriptFromYouTubeAPI(link);
    console.log(transcript);
    return transcript;
}

// Function to fetch transcript using YouTube API
const fetchTranscriptFromYouTubeAPI = async (link) => {
    // Make requests to YouTube API using your API key and fetch transcript
    // Replace 'YOUR_API_KEY' with your actual YouTube API key
    const apiKey = process.env.YOUTUBE_API;
    const apiUrl = `https://www.googleapis.com/youtube/v3/captions?${getVideoId(link)}&part=snippet&key=${apiKey}:`;${getVideoId(link)}&key=${apiKey}

    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(data);
    // Extract transcript from the API response, modify this based on the actual API response structure
    const transcript = data.items[0]?.snippet?.title || 'Transcript not available';

    return transcript;
}

// Helper function to extract video ID from YouTube URL
const getVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
}
