import PropTypes from "prop-types";

Button.propTypes = {
  fetchWords: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
  classAddition: PropTypes.string,
};

export function Button({ fetchWords, children, classAddition }) {
  return (
    <button
      className={`px-3 font-medium text-gray-500 py-0.5 hover:bg-gray-200 transition-all  duration-300 ${classAddition}`}
      onClick={() => fetchWords(Number(children))}
    >
      {children}
    </button>
  );
}
