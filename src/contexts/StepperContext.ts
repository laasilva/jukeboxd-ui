import { createContext, useContext } from "react";

export type ContextProps = {
  completed?: boolean;
  setCompleted?: any;
}

export const StepperContext = createContext<ContextProps>({});

export const useStepperContext = () => useContext(StepperContext);