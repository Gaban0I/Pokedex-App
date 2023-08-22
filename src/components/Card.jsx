import React from "react";
import styled from "styled-components";
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

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => `0px 0px 100px 0px ${props.color}`};
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 8px;
`;

const NameText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
`;
const StatText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 8px;
  color: black;
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
  /* display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center; */
  background: ${(props) => props.color || "#000"};
  box-shadow: ${(props) => `0px 0px 20px 0px ${props.color}`};
  & > img {
    margin: 20%;
    height: 60%;
    width: 60%;
  }
`;

const Card = ({ name, sprite, id, height, weight, type }) => {
  console.log(type);
  const {
    color = pokemonAttributes.default.color,
    icon = pokemonAttributes.default.icon,
  } = pokemonAttributes[type] || {};
  return (
    <CardContainer color={color}>
      <PokemonImage src={sprite} alt={name} />
      <NameText>{name}</NameText>
      <StatText>ID: {id}</StatText>
      <StatText>Height: {height}</StatText>
      <StatText>Weight: {weight}</StatText>
      <StatText style={{ display: "flex", flexFlow: "row" }}>
        Type: <TypeText color={color}>{type}</TypeText>
        <TypeIcon color={color}>
          <img src={icon} alt={`${type} icon`} />
        </TypeIcon>
      </StatText>
    </CardContainer>
  );
};

export default Card;
