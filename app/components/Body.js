'use client';
import FileUpload from './FileUpload';
import LinkUpload from './LinkUpload';
import FlashcardPreview from './FlashcardPreview';
import QuizDisplay from './QuizDisplay';
import Loading from './Loading';
import Options from './Options';
import { useState, useRef } from 'react';

const Body = () => {
    const [fileText, setFileText] = useState(null);
    const [cards, setCards] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const checkboxRef = useRef(false);
    const optionsRef = useRef("Flashcard Generation");

    const createFlashcards = async (text) => {
        setCards([]);
        setQuiz([]);
        setLoading(true);
        const res = await fetch("/api/TextToCards", {
            method: "POST",
            body: JSON.stringify({ text: text.text, arabic: checkboxRef.current.checked})
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

    const createQuiz = async (text) => {
        setCards([]);
        setQuiz([]);
        setLoading(true);
        const res = await fetch("/api/TextToQuiz", {
            method: "POST",
            body: JSON.stringify({ text: text.text, arabic: checkboxRef.current.checked})
        }).then((res) => res.json());
        console.log("Quiz generated successfully!")
        if(res.data){
            setQuiz(res.data)
            setLoading(false);
        }
        else{
            console.log("Error generating quiz!", res)
        }
    }

    if (fileText && optionsRef.current.value === "Flashcard Generation"){
        createFlashcards(fileText);
        setFileText(null);
    } else if (fileText && optionsRef.current.value === "Quiz Generation"){
        createQuiz(fileText);
        setFileText(null);
    }

    return (
        <main className="mb-auto">
            <FileUpload setText={setFileText} />
            <LinkUpload setText={setFileText} />
            <Options checkboxRef={checkboxRef} optionsRef={optionsRef}/>
            {isLoading ? <Loading /> : null}
            <FlashcardPreview cards={cards}/>
            <QuizDisplay quizData={quiz}/>
        </main>
    );


};

export default Body;