import styled from "styled-components";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import pokemonAttributes from "../services/Attribut.service";

//#region css
const CardContainer = styled.div`
  box-sizing: border-box;
  max-width: 230px;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) =>
    props.types[1].color === ""
      ? `0px 0px 100px 0px ${props.types[0].color}`
      : `-75px -100px 100px -75px ${props.types[0].color},
         -75px 100px 100px -75px ${props.types[0].color},
          75px 100px 100px -75px ${props.types[1].color},
          75px -100px 100px -75px ${props.types[1].color}
        `};
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;

const NameText = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 8px;
  color: black;
`;

const StatText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 8px;
  color: black;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TypeText = styled.p`
  color: ${(props) => props.color || "#000"};
  margin: 0;
  margin-left: 5px;
`;

const TypeIcon = styled.div`
  border-radius: 100%;
  height: 30px;
  width: 30px;
  margin: auto;
  margin-left: 5px;
  background: ${(props) => props.color || "#000"};
  box-shadow: ${(props) => `0px 0px 20px 0px ${props.color}`};
  & > img {
    margin: 20%;
    height: 60%;
    width: 60%;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-flow: row-wrap;
  align-items: center;
`;

const MoreButton = styled.button`
  margin-left: 10px;
  height: 40px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 0px 10px;
  color: grey;
  transition: all 0.2s linear;

  &:hover {
    color: black;
    border: 1px solid black;
  }
`;
//#endregion

const Card = ({ pokemon }) => {
  const type1 = pokemon.types[0].type.name;
  const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;

  const {
    color: color1 = pokemonAttributes.default.color,
    icon: icon1 = pokemonAttributes.default.icon,
  } = pokemonAttributes[type1] || {};

  const { color: color2 = "", icon: icon2 = pokemonAttributes.default.icon } =
    pokemonAttributes[type2] || {};

  return (
    <CardContainer types={[{ color: color1 }, { color: color2 }]}>
      <PokemonImage src={pokemon.sprites?.front_default} alt={pokemon.name} />
      <NameText>{pokemon.name}</NameText>
      <StatText>
        <TypeContainer>
          <TypeText color={color1}>{type1}</TypeText>
          <TypeIcon color={color1}>
            <img src={icon1} alt={`${type1} icon`} />
          </TypeIcon>
        </TypeContainer>
        {type2 !== null && (
          <TypeContainer>
            <TypeText color={color2}>{type2}</TypeText>
            <TypeIcon color={color2}>
              <img src={icon2} alt={`${type2} icon`} />
            </TypeIcon>
          </TypeContainer>
        )}
      </StatText>
      <Buttons>
        <LikeButton pokemon={pokemon} />
        <Link to={`/pokemon/${pokemon.name}`}>
          <MoreButton> en savoir plus </MoreButton>
        </Link>
      </Buttons>
    </CardContainer>
  );
};

Card.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default Card;
