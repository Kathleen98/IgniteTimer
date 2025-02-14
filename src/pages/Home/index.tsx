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

const Home = () => {
  return (
    <HomeContainer>
      <FormContainer>
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <TasksInput
            list={"task-suggestions"}
            placeholder="De um nome para o seu projeto"
            id={"task"}
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

        <StartCountdownButton disabled type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
