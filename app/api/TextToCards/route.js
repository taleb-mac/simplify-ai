"use server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
});

export async function POST(req) {
    try {
        const data = await req.json();
        const text = data.text;
        const isArabic = data.arabic;
        if (!text) throw new Error("No Text provided.");
        const cards = await textToCards(text, isArabic);
        return new NextResponse(JSON.stringify({ data: cards }), {
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

const textToCards = async (text, isArabic) => {
    let prompt = `you are being used in a website that creates flash cards from pdfs to help students study,
    create flash cards summarizing important information from the following text into short sentences used for studying,
    separate each flash card with a new line only, do not include any other punctuation, include the text immediately,
    only include the flash cards in your response.`;
    isArabic ? prompt += ` Create the flash cards in arabic.` : null;
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    "role": "system",
                    "content": prompt
                },
                { "role": "user", "content": text }],
            model: "gpt-4",
        });
        console.log(completion.choices[0])
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error)
    };

};