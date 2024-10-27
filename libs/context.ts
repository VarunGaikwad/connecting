import { createContext, useContext } from "react";

export type GlobalContextType = {
  localModel?: any;
  setLocalModel?: (value: any) => void;
};

export const GlobalContext = createContext<GlobalContextType | {}>({});

export const useGlobal = () => useContext(GlobalContext);
