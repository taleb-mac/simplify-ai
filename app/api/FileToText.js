import React from "react";
import Tesseract from "tesseract.js";

export default async function ReadFile(file) {
  console.log("Reading file...");

  const fileType = file.type;
  const text = await extractTextFromPDF(file);
  console.log(text);

  // try {
  //   if (fileType === "application/pdf") {
  //     // For PDF files
  //     console.log(text);
  //     return text;
  //   } else if (fileType.startsWith("image/")) {
  //     // For image files
  //     const {
  //       data: { text },
  //     } = await Tesseract.recognize(file, "eng", {
  //       logger: (info) => console.log(info),
  //     });

  //     console.log(text);
  //     return text;
  //   } else {
  //     console.error("Unsupported file type");
  //     return null;
  //   }
  // } catch (error) {
  //   console.error("Error reading file:", error);
  //   return null;
  // }
}

const extractTextFromPDF = async (pdfFile) => {
  console.log("Extracting text from PDF...");
    const req = await fetch('/api/whatever', { // Replace with your actual server address and port
    method: 'POST',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: pdfFile,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  console.log(req);
};
