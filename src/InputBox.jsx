import PropTypes from "prop-types";
import { useState } from "react";

InputBox.propTypes = {
  setCorrect: PropTypes.func.isRequired,
  currentWord: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentWord: PropTypes.func.isRequired,
  setWordStates: PropTypes.func.isRequired,
  wordStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setWpm: PropTypes.func,
  isDisabled: PropTypes.bool,
  setIsDisabled: PropTypes.func,
  ref: PropTypes.object,
};

export function InputBox({
  setCorrect,
  currentWord,
  words,
  setCurrentWord,
  setWordStates,
  wordStates,
  setWpm,
  isDisabled,
  setIsDisabled,
  inputRef,
  input,
  setInput
}) {
  const [startTime, setStartTime] = useState(0);
  

  function handleInput(e) {
    if (e.target.value.slice(-1) === " ") {
      console.log(currentWord === 0);
      if (currentWord === 0) {
        setStartTime(Date.now());
        console.log(startTime);
      }
      const correct = e.target.value.trim() === words[currentWord];
      handleSetWordStates(correct);
      setCurrentWord(currentWord + 1);
      setCorrect(correct);
      setInput("");
      console.log(currentWord, words.length - 1);
      if (currentWord === words.length - 1) {
        const endTime = Date.now();
        const time = (endTime - startTime) / 1000;
        const wpm = Math.round(words.length / (time / 60));
        setWpm(wpm);
        setIsDisabled(true);
      }

      return;
    }
    setInput(e.target.value);
  }

  function handleSetWordStates(correct) {
    const newWordStates = [...wordStates];
    newWordStates[currentWord] = correct;
    setWordStates(newWordStates);
  }
  return (
    <input
      id="inputBox"
      className="border-2 rounded-md w-96 px-1 font-medium text-gray-700 ring-gray-600 focus:border-gray-700 "
      disabled={isDisabled}
      type="text"
      value={input}
      onChange={handleInput}
      ref={inputRef}
    />
  );
}
