import styled from "styled-components";

interface ButtonContainerProps {}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${(props) => props.theme.primary};
`;
