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
        const quizData = await textToQuiz(text, isArabic);
        return new NextResponse(JSON.stringify({ data: quizData }), {
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

const textToQuiz = async (text, isArabic) => {
    let prompt = `you are being used in a website that generates quizzes from text,
    create short answer questions and answers for the following information,
    separate each question with a new line only, separate each question and answer with a | only, do not include any other punctuation,
    include the text immediately, only include the questions and answers in your response.`;
    isArabic ? prompt += ` Generate the quiz in arabic.` : null;
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
        
        console.log(completion.choices[0].message.content)
        const quizPairs = completion.choices[0].message.content.split('\n').map(pair => pair.split('|').map(item => item.trim()));
        // Format the response as an array of objects with 'question' and 'answer' properties
        const quizData = quizPairs.map(pair => ({ question: pair[0], answer: pair[1] }));
        console.log(quizData)
        return quizData;
    } catch (error) {
        console.error("Error:", error)
    }
};
