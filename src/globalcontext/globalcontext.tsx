import { createContext, ReactNode, useEffect, useState } from 'react';
import { TypeWeldBead } from '../types/typescontext';
import { getLastWeldBead } from '../api/api';

interface TypeGlobalContext {
  setId: (isId: string | null) => void;
  isLastWeldBead: TypeWeldBead[] | null;
  setLastWeldBead: (isLastWeldBead: TypeWeldBead[] | null) => void;
}

const initialContext: TypeGlobalContext = {
  setId: () => {},
  isLastWeldBead: null,
  setLastWeldBead: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isId, setId] = useState<string | null>(null);
  const [isLastWeldBead, setLastWeldBead] = useState<TypeWeldBead[] | null>(
    null
  );

  useEffect(() => {
    async function getDatas() {
      if (isId) {
        const lastWeldBead = await getLastWeldBead(isId);
        setLastWeldBead(lastWeldBead);
      }
    }

    if (isId) {
      getDatas();
    }
  }, [isId]);

  return (
    <GlobalContext.Provider value={{ setId, isLastWeldBead, setLastWeldBead }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
