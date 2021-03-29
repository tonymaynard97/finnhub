export const Button = ({ onClick, children, bgColour = "gray-700", hoverBgColour = "gray-800", text = "lg", value, small, dataTestId }) => (
  <button
    data-testid={dataTestId}
    value={value}
    onClick={onClick}
    type="button"
    className={`border border-${hoverBgColour} bg-${bgColour} text-${text} rounded-md ${
      small ? "px-1 py-0.5" : "px-4 py-2"
    } m-0.5 transition duration-500 ease select-none hover:bg-${hoverBgColour} focus:outline-none focus:shadow-outline`}
  >
    {children}
  </button>
);
