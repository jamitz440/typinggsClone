import { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [wordStates, setWordStates] = useState(Array(words.length).fill(false));

  function fetchWords(ammount: number) {
    fetch(`https://random-word-api.herokuapp.com/word?number=${ammount}`)
      .then((res) => res.json())
      .then((data) => setWords(data));
    setCurrentWord(0);
    setWordStates(Array(ammount).fill(false));
  }

  return (
    <>
      <div>
        <TextBox
          words={words}
          wordStates={wordStates}
          currentWord={currentWord}
        />
      </div>
      <InputBox
        setCorrect={setCorrect}
        currentWord={currentWord}
        words={words}
        setCurrentWord={setCurrentWord}
        wordStates={wordStates}
        setWordStates={setWordStates}
      />

      <Button fetchWords={fetchWords}>25</Button>
      <Button fetchWords={fetchWords}>50</Button>
      <Button fetchWords={fetchWords}>100</Button>
    </>
  );
}

interface TextBoxProps {
  words: string[];
  wordStates: boolean[];
  currentWord: number;
}

function TextBox({ words, wordStates, currentWord }: TextBoxProps) {
  function getWordClass(index) {
    if (currentWord === index) {
      return "text-gray-400"; // Dark gray for the current word
    } else if (currentWord > index) {
      return wordStates[index] ? "text-green-500" : "text-red-500"; // Green or red based on wordStates
    } else {
      return "text-gray-200"; // Light gray for future words
    }
  }
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {words.map((word, index) => (
        <div className={getWordClass(index)} key={index}>
          {word}
        </div>
      ))}
    </div>
  );
}

interface ButtonProps {
  fetchWords: (arg: number) => void;
  children: string;
}

function Button({ fetchWords, children }: ButtonProps) {
  return (
    <button className="m-2" onClick={() => fetchWords(Number(children))}>
      {children}
    </button>
  );
}

interface InputBoxProps {
  setCorrect: (correct: boolean) => void;
  currentWord: number;
  words: string[];
  setCurrentWord: (currentWord: number) => void;
  setWordStates: (wordStates: boolean[]) => void;
  wordStates: boolean[];
}

function InputBox({
  setCorrect,
  currentWord,
  words,
  setCurrentWord,
  setWordStates,
  wordStates,
}: InputBoxProps) {
  const [input, setInput] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.slice(-1) === " ") {
      const correct = e.target.value.trim() === words[currentWord];
      console.log(correct);
      handleSetWordStates(correct);
      setCurrentWord(currentWord + 1);
      setCorrect(correct);
      setInput("");
      return;
    }
    setInput(e.target.value);
  }

  function handleSetWordStates(correct: boolean) {
    const newWordStates = [...wordStates];
    newWordStates[currentWord] = correct;
    setWordStates(newWordStates);
    console.log(wordStates);
  }
  return (
    <div>
      <input type="text" value={input} onChange={handleInput} />
    </div>
  );
}

export default App;
