import { createContext, ReactNode, useEffect, useState } from 'react';
import { TypeWeldBead } from '../types/typescontext';
import { getLastWeldBead } from '../api/api';

interface TypeGlobalContext {
  setId: (isId: string | null) => void;
  isPrometeusCode: string | null;
  isLastWeldBead: TypeWeldBead[] | null;
  setLastWeldBead: (isLastWeldBead: TypeWeldBead[] | null) => void;
  setPrometeusCode: (isPrometeusCode: string | null) => void;
}

const initialContext: TypeGlobalContext = {
  setId: () => {},
  isLastWeldBead: null,
  isPrometeusCode: null,
  setLastWeldBead: () => {},
  setPrometeusCode: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isId, setId] = useState<string | null>(null);
  const [isPrometeusCode, setPrometeusCode] = useState<string | null>(null);
  const [isLastWeldBead, setLastWeldBead] = useState<TypeWeldBead[] | null>(
    null
  );

  useEffect(() => {
    async function getDatas() {
      if (isId) {
        const lastWeldBead = await getLastWeldBead(isId);
        console.log(lastWeldBead);
        setLastWeldBead(lastWeldBead);
      }
    }

    if (isId) {
      getDatas();
    }
  }, [isId]);

  return (
    <GlobalContext.Provider
      value={{
        setId,
        isLastWeldBead,
        setLastWeldBead,
        isPrometeusCode,
        setPrometeusCode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
