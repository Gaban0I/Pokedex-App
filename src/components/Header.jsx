import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/pokeballRsB.svg";

//#region css

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  margin: 0px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 0px 0px 10px 10px;
  -webkit-box-shadow: 0px 0px 71px 0px rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 0px 0px 71px 0px rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 71px 0px rgba(255, 255, 255, 0.7);
`;
const MenuItem = styled.li`
  margin: 0px 10px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  text-decoration: underline 0.15em rgba(0, 0, 0, 0);
  transition: text-decoration-color 300ms;
  &:hover {
    text-decoration: underline 0.15em rgb(0, 0, 0, 1);
  }
  transition: 0.2s linear;
  color: ${(props) => (props.active ? "black" : "grey")};
  &:hover {
    color: black;
  }
`;

const Logo = styled.img`
  cursor: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);
  -moz-box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);
  box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);
`;

//#endregion

function Header() {
  const location = useLocation();

  return (
    <Menu>
      <MenuItem>
        <StyledLink to="/poketrap" active={location.pathname === "/poketrap"}>
          PokeTrap
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <Logo src={logo} alt="Logo PokeMania" />
      </MenuItem>
      <MenuItem>
        <StyledLink to="/pokedex" active={location.pathname === "/pokedex"}>
          Pokedex
        </StyledLink>
      </MenuItem>
    </Menu>
  );
}

export default Header;
