'use client'
import { useState } from "react";

const LinkUpload = (props) => {
    const [youtubeLink, setYoutubeLink] = useState("");

    const handleSubmit = async() => {
        if (!youtubeLink) return;
        console.log("Fetching Video...")
        const text = await fetch("/api/LinkToText", {
        method: "POST",
        body: JSON.stringify({ link: youtubeLink})
        }).then((res) => res.json());
        props.setText(text);
        console.log("Video Fetched successfully!")
    };

    return (
        <div className="flex items-center justify-center my-12">
            <input
                type="text"
                id="link"
                className="bg-black text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-96 mr-2"
                placeholder="Youtube Link"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                required
            />
            <button
                className="bg-white text-black p-2.5 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default LinkUpload;
