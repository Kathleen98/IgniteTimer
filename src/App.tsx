import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { ButtonContainer } from "./Button.styles";
import { GlobalStyle } from "./styles/themes/global";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ButtonContainer>Enviar</ButtonContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
