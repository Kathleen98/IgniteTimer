import { Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <FormContainer>
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id={"task"}></input>
          <label htmlFor="minutesAmount">Durante</label>
          <input type="number" id="minutesAmount"></input>
          <span>minutos</span>
        </div>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <button type="submit">
          <Play size={24} /> Começar
        </button>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
