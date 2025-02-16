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

const Home = () => {
  const { register, handleSubmit, watch } = useForm();

  const handleCreateNewCycle = (data: any) => {
    console.log(data);
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

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
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos</span>
        </div>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
