import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface HeaderContextData {
  headerStatus: boolean;
  setHeaderStatus: (value: boolean) => void;
}

export const HeaderContext = createContext({} as HeaderContextData);

interface HeaderContextProviderProps {
  children: ReactNode;
}
export default function HeaderContextProvider({ children }: HeaderContextProviderProps) {
  const [headerStatus, setHeaderStatusProvider] = useState(true);

  function setHeaderStatus(value: boolean) {
    setHeaderStatusProvider(value);
  }

  return (
    <HeaderContext.Provider value={{ headerStatus, setHeaderStatus }}>
      {children}
    </HeaderContext.Provider>
  );
}
