import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TasksInput } from "./style";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CyclesContext";

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <div>
        <label htmlFor="task">Vou trabalhar em</label>
        <TasksInput
          list={"task-suggestions"}
          placeholder="De um nome para o seu projeto"
          id={"task"}
          {...register("task")}
          disabled={!!activeCycle}
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
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        />
        <span>minutos</span>
      </div>
    </FormContainer>
  );
};

export default NewCycleForm;
