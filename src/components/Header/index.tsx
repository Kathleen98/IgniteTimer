import { Scroll, Timer } from "phosphor-react";
import { HeaderContainer } from "./style";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <img
        src={
          "https://github.com/user-attachments/assets/8f138b13-7a33-4547-a2ed-81829c611e2c"
        }
      />

      <nav>
        <NavLink to={"/"} title={"timer"}>
          <Timer size={24} />
        </NavLink>
        <NavLink to={"/history"} title={"histórico"}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
