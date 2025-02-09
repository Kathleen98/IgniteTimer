import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { ButtonContainer } from "./Button.styles";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ButtonContainer>Enviar</ButtonContainer>
    </ThemeProvider>
  );
}

export default App;
