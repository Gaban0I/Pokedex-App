import React from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";

import normal from "../assets/normal.svg";
import fighting from "../assets/fighting.svg";
import flying from "../assets/flying.svg";
import poison from "../assets/poison.svg";
import ground from "../assets/ground.svg";
import rock from "../assets/rock.svg";
import bug from "../assets/bug.svg";
import ghost from "../assets/ghost.svg";
import steel from "../assets/steel.svg";
import fire from "../assets/fire.svg";
import water from "../assets/water.svg";
import grass from "../assets/grass.svg";
import electric from "../assets/electric.svg";
import psychic from "../assets/psychic.svg";
import ice from "../assets/ice.svg";
import dragon from "../assets/dragon.svg";
import dark from "../assets/dark.svg";
import fairy from "../assets/fairy.svg";

const pokemonAttributes = {
  normal: { color: "#A0A29F", icon: normal },
  grass: { color: "#5FBD58", icon: grass },
  fire: { color: "#FBA54C", icon: fire },
  fighting: { color: "#D3425F", icon: fighting },
  water: { color: "#539DDF", icon: water },
  electric: { color: "#F2D94E", icon: electric },
  bug: { color: "#92BC2C", icon: bug },
  dark: { color: "#595761", icon: dark },
  dragon: { color: "#0C69C8", icon: dragon },
  fairy: { color: "#EE90E6", icon: fairy },
  flying: { color: "#A1BBEC", icon: flying },
  ghost: { color: "#5F6DBC", icon: ghost },
  ground: { color: "#DA7C4D", icon: ground },
  ice: { color: "#75D0C1", icon: ice },
  poison: { color: "#B763CF", icon: poison },
  psychic: { color: "#FA8581", icon: psychic },
  rock: { color: "#C9BB8A", icon: rock },
  steel: { color: "#5695A3", icon: steel },
  default: { color: "#A4A4A4", icon: null },
};
//#region css
const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) =>
    props.types[1].color === ""
      ? `0px 0px 100px 0px ${props.types[0].color}`
      : `30px 0px 100px 0px ${props.types[1].color},
        -30px 0px 100px 0px ${props.types[0].color}`};
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;

const NameText = styled.p`
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
        {/* <Link to={`/pokemon/${pokemon.id}`}>
          <MoreButton> En savoir plus </MoreButton>
        </Link> */}
      </Buttons>
    </CardContainer>
  );
};

export default Card;
