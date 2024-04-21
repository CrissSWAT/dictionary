import { useState } from "react";

const DropDown = () => {
  const [fontClass, setFontClass] = useState("font-sans");

  const handleFontChange = (newFontClass) => {
    setFontClass(newFontClass);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.className = newFontClass;
    }
  };

  return (
    <>
      <button
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="text-black dark:text-white flex gap-2"
        type="button"
      >
        {fontClass.replace("font-", "")} {/* Muestra la fuente actual */}
        <svg
          className="w-2.5 h-2.5 m-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDelay"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDelayButton"
        >
          <li>
            <button
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
              onClick={() => handleFontChange("font-sans")}
            >
              Helvetica
            </button>
          </li>
          <li>
            <button
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
              onClick={() => handleFontChange("font-serif")}
            >
              Georgia
            </button>
          </li>
          <li>
            <button
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
              onClick={() => handleFontChange("font-mono")}
            >
              Courier New
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropDown;
