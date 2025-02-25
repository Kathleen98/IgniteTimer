import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useState } from "react";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number(),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle: Cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    };
    setCycles((state: Cycle[]) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    newCycleForm.reset();
  };

  const task = newCycleForm.watch("task");
  const isSubmitDisabled = !task;

  const handleInterruptCycle: () => void = () => {
    setCycles((state) =>
      state.map((cycle: Cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  };

  return (
    <HomeContainer>
      <form onSubmit={newCycleForm.handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!!isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
