"use client";
import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';

const FileUpload = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles[0])
    },
  });

  const handleFileUpload = async (e) => {
    if (!e) return;
    const file = e;
    let formData = new FormData();
    formData.set("file", file);

    console.log("Uploading file...")
    const text = await fetch("/api/FileToText", {
      method: "POST",
      body: formData
    }).then((res) => res.json());
    props.setText(text);
    console.log("File uploaded successfully!")
  };

  return (
    <div className="flex items-center justify-center my-12">
      <div {...getRootProps()} className="w-full max-w-lg p-4 border-2 border-dashed rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center h-64 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              PDF, or Image files
            </p>
          </div>

        </label>
      </div>
    </div>
  );
};

export default FileUpload;
