import { useState, createContext } from "react";

const Context = createContext();

function Provider({ children }) {
  const [files, setFiles] = useState([]);

  return (
    <Context.Provider value={{ files, setFiles }}>{children}</Context.Provider>
  );
}

export { Provider, Context };
