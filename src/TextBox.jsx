import PropTypes from "prop-types";

TextBox.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  wordStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
  currentWord: PropTypes.number.isRequired,
};

export function TextBox({ words, wordStates, currentWord }) {
  function getWordClass(index) {
    if (currentWord === index) {
      return "text-gray-700"; // Dark gray for the current word
    } else if (currentWord > index) {
      return wordStates[index] ? "text-green-500" : "text-red-500"; // Green or red based on wordStates
    } else {
      return "text-gray-400"; // Light gray for future words
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
