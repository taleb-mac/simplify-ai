'use client';
import FileUpload from './FileUpload';
import FlashcardPreview from './FlashcardPreview';
import Loading from './Loading';
import { useState } from 'react';

const Body = () => {
    const [fileText, setFileText] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const createFlashcards = async (text) => {
        setLoading(true);
        const res = await fetch("/api/TextToCards", {
            method: "POST",
            body: JSON.stringify({ text: text.text })
        }).then((res) => res.json());
        console.log("Cards generated successfully!")
        if(res.data){
            const cardsArray = res.data.split("\n")
            setCards(cardsArray.map((item, index) => ({
                id: index,
                summary: item.trim()
            })))
        setLoading(false);
        }
        else{
            console.log("Error generating cards!", res)
        }
    };

    if (fileText){
        createFlashcards(fileText);
        setFileText(null);
    }

    return (
        <main className="mb-auto">
            <FileUpload setText={setFileText} />
            {isLoading ? <Loading /> : null}
            <FlashcardPreview cards={cards}/>
        </main>
    );


};

export default Body;