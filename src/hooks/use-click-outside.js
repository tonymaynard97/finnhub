const { useEffect, useState } = require("react");

const useClickOutsideHandler = (ref) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) {
        setIsFocused(false);
      } else setIsFocused(true);
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return { isFocused };
};

export default useClickOutsideHandler;
