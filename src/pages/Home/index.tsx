import { Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TasksInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number(),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    reset();
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
    };
    setCycles((state: Cycle[]) => [...state, newCycle]);
    setActiveCycleId(id);
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);
  console.log(activeCycle);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCycle)}>
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <TasksInput
            list={"task-suggestions"}
            placeholder="De um nome para o seu projeto"
            id={"task"}
            {...register("task")}
          />
          <datalist id={"task-suggestions"}>
            <option value={"primeiro"} />
            <option value={"segundo"} />
          </datalist>
          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos</span>
        </div>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
