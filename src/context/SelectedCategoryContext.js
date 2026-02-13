import { createContext, useContext, useState } from "react";

// Creamos el contexto
const SelectedCategoryContext = createContext();

// Creamos el proveedor que envolverá nuestra aplicación
export const SelectedCategoryProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <SelectedCategoryContext.Provider
      value={{ selectedIndex, setSelectedIndex }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};

// Creamos un hook personalizado para acceder al contexto
export const useSelectedCategory = () => {
  return useContext(SelectedCategoryContext);
};
