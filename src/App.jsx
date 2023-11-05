import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { TextBox } from "./TextBox";
import data from "./words.json";

function App() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [wordStates, setWordStates] = useState(Array(words.length).fill(false));
  const [wpm, setWpm] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(
    function () {
      if (!focus) {
        return;
      }
      document.getElementById("inputBox").focus();
      setFocus(false);
    },
    [focus]
  );

  function fetchWords(ammount) {
    const randomWords = [];

    while (randomWords.length < ammount) {
      const randomIndex = Math.floor(Math.random() * data.words.length);
      const word = data.words[randomIndex];
      if (!randomWords.includes(word)) {
        randomWords.push(word);
      }
    }
    setWords(randomWords);
    setCurrentWord(0);
    setWordStates(Array(ammount).fill(false));
    setIsDisabled(false);
    setWpm(0);
    setFocus(true);
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center p-4">
        <div className="border-2 border-gray-100 p-2 rounded-md mb-4 mx-auto w-1/2 ">
          <TextBox
            words={words}
            wordStates={wordStates}
            currentWord={currentWord}
          />
        </div>
        <div className="">
          <InputBox
            setCorrect={setCorrect}
            currentWord={currentWord}
            words={words}
            setCurrentWord={setCurrentWord}
            wordStates={wordStates}
            setWordStates={setWordStates}
            setWpm={setWpm}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
          <Stats wpm={wpm} />
        </div>
        <div className="infline-flex mt-4" role="group">
          <Button classAddition="rounded-l-md border-2" fetchWords={fetchWords}>
            25
          </Button>
          <Button
            classAddition=" border-b-2 border-t-2"
            fetchWords={fetchWords}
          >
            50
          </Button>
          <Button classAddition="border-2 rounded-r-md" fetchWords={fetchWords}>
            100
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

function Stats({ wpm }) {
  return <div className="text-center p-4">WPM: {wpm}</div>;
}
