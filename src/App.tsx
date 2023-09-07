import { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [correct, setCorrect] = useState(false);

  function fetchWords(ammount: number) {
    fetch(`https://random-word-api.herokuapp.com/word?number=${ammount}`)
      .then((res) => res.json())
      .then((data) => setWords(data));
  }

  return (
    <>
      <div>
        <TextBox words={words} />
      </div>
      <InputBox
        setCorrect={setCorrect}
        currentWord={currentWord}
        words={words}
        setCurrentWord={setCurrentWord}
      />

      <Button fetchWords={fetchWords}>25</Button>
      <Button fetchWords={fetchWords}>50</Button>
      <Button fetchWords={fetchWords}>100</Button>
    </>
  );
}

interface TextBoxProps {
  words: string[];
}

function TextBox({ words }: TextBoxProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {words.map((word) => (
        <div key={word}>{word}</div>
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
}

function InputBox({
  setCorrect,
  currentWord,
  words,
  setCurrentWord,
}: InputBoxProps) {
  const [input, setInput] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.slice(-1) === " ") {
      const correct = e.target.value.trim() === words[currentWord];
      console.log(correct);
      setCurrentWord(currentWord + 1);
      setCorrect(correct);
      setInput("");
      return;
    }
    setInput(e.target.value);
  }
  return (
    <div>
      <input type="text" value={input} onChange={handleInput} />
    </div>
  );
}

export default App;
