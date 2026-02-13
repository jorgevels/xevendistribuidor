import { createContext, useContext, useRef } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const inputRef = useRef(null);

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Pequeña pausa para que termine el scroll antes del focus
      setTimeout(() => {
        inputRef.current.focus();
      }, 400); // puedes ajustar este tiempo (ms)
    }
  };

  return (
    <SearchContext.Provider value={{ inputRef, scrollToInput }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
