import { createContext, ReactNode, useEffect, useState } from 'react';
import { TypeWeldBead } from '../types/typescontext';
import { getLastWeldBead } from '../api/api';
import { TypeStatusPrometeus } from '../types/TypePrometeusStatus';

interface TypeGlobalContext {
  setId: (isId: string | null) => void;
  isPrometeusCode: string | null;
  isId: string | null;
  isStatusPrometeusGlobal: TypeStatusPrometeus[] | null;
  setStatusPrometeusGlobal: (
    isStatusPrometeusGlobal: TypeStatusPrometeus[] | null
  ) => void;
  isLastWeldBead: TypeWeldBead[] | null;
  setLastWeldBead: (isLastWeldBead: TypeWeldBead[] | null) => void;
  setPrometeusCode: (isPrometeusCode: string | null) => void;
}

const initialContext: TypeGlobalContext = {
  setId: () => {},
  isId: null,
  isLastWeldBead: null,
  isPrometeusCode: null,
  isStatusPrometeusGlobal: null,
  setLastWeldBead: () => {},
  setPrometeusCode: () => {},
  setStatusPrometeusGlobal: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isStatusPrometeusGlobal, setStatusPrometeusGlobal] = useState<
    TypeStatusPrometeus[] | null
  >(null);
  const [isId, setId] = useState<string | null>(null);
  const [isPrometeusCode, setPrometeusCode] = useState<string | null>(isId);
  const [isLastWeldBead, setLastWeldBead] = useState<TypeWeldBead[] | null>(
    null
  );

  const handleSocketMessage = (event: { data: string }) => {
    try {
      const data: TypeStatusPrometeus[] = JSON.parse(event.data);
      setStatusPrometeusGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://172.31.98.228:8080');

    socket.addEventListener('open', () => {
      socket.send('conexão estalecida');
    });

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.close();
    };
  }, []);

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

    const time = setInterval(() => {
      getDatas();
    }, 5000);

    return () => {
      clearInterval(time);
    };
  }, [isId]);

  return (
    <GlobalContext.Provider
      value={{
        isId,
        isStatusPrometeusGlobal,
        setStatusPrometeusGlobal,
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
