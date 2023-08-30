import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { getPokemonByName } from "../services/Api.service";
import shiny from "../assets/shiny.png";
import pokemonAttributes from "../services/Attribut.service";

//#region css
const Image = styled.img``;
const StatList = styled.ul``;
const StatItem = styled.li``;
const StatBar = styled.div``;
const StatValue = styled.span``;
const TypeList = styled.ul``;
const TypeItem = styled.li``;
const NameContainer = styled.div``;
const ShinyImage = styled.img``;
const CaracList = styled.div``;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${NameContainer} {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    & > h1 {
    }
    & > ${ShinyImage} {
      left: -25px;
      top: 10px;
      position: absolute;
      width: 25px;
    }
  }

  & > ${TypeList} {
    margin-top: 20px;
    list-style: none;
    padding: 0;
    display: flex;

    & > ${TypeItem} {
      padding: 5px 10px;
      margin-right: 8px;
      background-color: #f5f5f5;
      color: black;
      border-radius: 5px;
    }
  }

  & > ${Image} {
    width: 200px;
    height: 200px;
  }

  & > ${StatList} {
    margin: 20px 0px;
    list-style: none;
    padding: 0;

    & > ${StatItem} {
      display: flex;
      justify-content: space-between;
      width: 500px;
      margin-bottom: 8px;

      & > span {
      }

      & > ${StatBar} {
        position: relative;
        background-color: #e0e0e0;
        border-radius: 4px;
        width: 250px;
        height: 20px;
        margin: 5px 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > div {
          background-color: #4caf50;
          height: 100%;
          border-radius: 4px;
          position: relative;
        }
        & > ${StatValue} {
          color: #333;
          padding: 0 5px;
          border-radius: 2px;
          background-color: transparent;
        }
      }
    }
  }

  & > ${CaracList} {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0px;
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      & > p {
        width: 250px;
      }
    }
  }
`;

//#endregion

const Pokemon = () => {
  const { name } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [poke, setPoke] = useState(null);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    console.log(name);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getPokemonByName(name);
        console.log(result);
        setPoke(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      {error && <Error err={error} />}
      {isLoading && <Loader />}
      {poke && (
        <Container>
          <NameContainer>
            {isShiny && <ShinyImage src={shiny} />}
            <h1>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
            <LikeButton pokemon={poke} />
          </NameContainer>
          <TypeList>
            {poke.types?.map((type, index) => (
              <TypeItem
                key={index}
                style={{
                  backgroundColor:
                    pokemonAttributes[type.type.name]?.color ||
                    pokemonAttributes.default.color,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  color: "white",
                }}
              >
                <img
                  src={
                    pokemonAttributes[type.type.name]?.icon ||
                    pokemonAttributes.default.icon
                  }
                  style={{ width: "20px", marginRight: "5px" }}
                  alt={type.type.name}
                />
                {type.type.name.toUpperCase()}
              </TypeItem>
            ))}
          </TypeList>
          <Image
            src={
              isShiny ? poke.sprites?.front_shiny : poke.sprites?.front_default
            }
            alt={poke.name}
            onMouseEnter={() => setIsShiny(true)}
            onMouseLeave={() => setIsShiny(false)}
          />
          <p style={{ marginBottom: "10px" }}>id : #{poke.id}</p>
          <h2>Statistiques</h2>
          <StatList>
            {poke.stats.map((stat, index) => (
              <StatItem key={index}>
                <span>{stat.stat.name} :</span>
                <StatBar>
                  <div
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>{" "}
                  <StatValue>{stat.base_stat}</StatValue>
                </StatBar>
              </StatItem>
            ))}
          </StatList>
          <h2>Caractéristique</h2>
          <CaracList>
            <div>
              <p>Poids :</p> <p>{poke.weight / 10} kg</p>
            </div>
            <div>
              <p>Taille :</p> <p>{poke.height / 10} m</p>
            </div>
            <div>
              <p>capacités :</p>
              <p>
                {poke.abilities
                  ?.map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
          </CaracList>
        </Container>
      )}
    </div>
  );
};

export default Pokemon;
