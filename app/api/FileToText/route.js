"use server";
import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import fs from "fs-extra";
import OpenAI from "openai";


const conf = new OpenAI({
  apiKey: process.env.GPT_API,
  
});

export async function POST(req) {
  try {

    // Parse the FormData from the request
    const formData = await req.formData();
    const file = formData.get("file"); // Get the file from FormData
    
    if (!file) throw new Error("No file provided.");

    switch (file.type) {
      case "application/pdf":
        const pdftext = await extractTextFromPDF(file);
        if (pdftext) {
          textToCards(pdftext);
        }
        return new NextResponse(JSON.stringify({ text: pdftext }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      case "image/png" || "image/jpeg":
        const text = await extractTextFromImage(file);
        if (text) {
          return new NextResponse(JSON.stringify({ text: text }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } else {
          return new NextResponse(
            JSON.stringify({ error: "Error reading image" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" }
            }
          );
        }

      default:
        console.error("Unsupported file type");
        return new NextResponse(
          JSON.stringify({ error: "Unsupported file type" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ status: "error", data: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const extractTextFromImage = async (imageFile) => {
  console.log("Extracting text from image...");

  const formData = new FormData();
  formData.append("file", imageFile); // Replace 'image.jpg' with the actual file name if available
  formData.append("language", "eng");
  formData.append("apikey", process.env.OCRSPACE_API);

  try {
    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    if (result.OCRExitCode !== 1) {
      throw new Error(`OCR Error: ${result.ErrorMessage}`);
    }
    console.log(result);
    const text = result.ParsedResults[0].ParsedText;
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error during OCR.space API call:", error);
    throw error;
  }
};

const extractTextFromPDF = async (pdfFile) => {
  console.log("Extracting text from PDF...");
  const buffer = Buffer.from(await pdfFile.arrayBuffer());
  const tempFilePath = "tempPdfFile.pdf";

  // Write the PDF buffer to a temporary file
  await fs.writeFile(tempFilePath, buffer);

  // Create a new instance of PDFParser
  const pdfParser = new PDFParser(this, 1);
  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData) => {
      fs.remove(tempFilePath); // Clean up even if there's an error
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      const text = pdfParser.getRawTextContent();
      console.log(text);
      await fs.remove(tempFilePath);
      resolve(text);
    });

    // Load the PDF file
    pdfParser.loadPDF(tempFilePath);
  });
};

const textToCards =  async (text) => {
  const openai = new OpenAI(conf);
  try {
    console.log("Calling the Assistant..");

    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: 'asst_fAmqiwjOHTnGMDRvfu2yq84X',
    });
    
    console.log(run);
  } catch (error) {
    console.error('Error calling the Assistant with function:', error);
  }
}
  
