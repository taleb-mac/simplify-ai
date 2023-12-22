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
    const videoId = getVideoId(link);
    const url = `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${videoId}`;

    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.RAPID_API,
        'X-RapidAPI-Host': 'subtitles-for-youtube.p.rapidapi.com'
    }
    };

    try {
    const response = await fetch(url, options);
    const subtitles = await JSON.parse( await response.text());

    
    // Extract the "text" property from each object and concatenate them
    const concatenatedText = await subtitles.map(subtitle => subtitle.text).join(' ');
    console.log(concatenatedText);
    return concatenatedText;

    } catch (error) {
    console.error(error);
    }
}

// Helper function to extract video ID from YouTube URL
const getVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
}


