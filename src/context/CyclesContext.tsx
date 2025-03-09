import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextoProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

const CyclesContextProvider = ({ children }: CyclesContextoProviderProps) => {
  const [cycles, dispatch] = useReducer((state : Cycle[], action : any) => {
    console.log(state)
    console.log(action)

    if(action.type === "ADD_NEW_CYCLE"){
      return [...state, action.payload.newCycle]
    }
    
    return state 
  }, []);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type:"MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId
      }
    })
    // setCycles((state) =>
    //   state.map((cycle: Cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   }),
    // );
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    };
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    // setCycles((state: Cycle[]) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

  };

  const interruptCurrentCycle: () => void = () => {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload:{
        activeCycleId
      }
    })
    // setCycles((state) =>
    //   state.map((cycle: Cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   }),
    // );

    setActiveCycleId(null);
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export default CyclesContextProvider;
