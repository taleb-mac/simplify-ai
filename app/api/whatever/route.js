import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';



export async function POST(req) {
    try {
        console.log(await req.json);
        
        // Check if the file exists
        if (!pdfFile) {
            return new NextResponse(JSON.stringify({ error: 'No file uploaded.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Instantiate a new PDFParser
        let pdfParser = new PDFParser();

        // Promisify the 'pdfParser.on("pdfParser_dataReady")' event
        const parsePDF = () => new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataReady", pdfData => {
                resolve(pdfParser.getRawTextContent());
            });

            pdfParser.on("pdfParser_dataError", err => {
                reject(err);
            });

            // Load PDF file
            pdfParser.loadPDF(pdfFile.filepath);
        });

        // Call the parsePDF function and wait for the text content
        const textContent = await parsePDF();

        return new NextResponse(JSON.stringify({
            status: "success",
            data: { text: textContent }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ status: "error", data: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}