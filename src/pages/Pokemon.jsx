import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { getPokemonByName } from "../ApiService";

//#region css
const Image = styled.img``;
const StatList = styled.ul``;
const StatItem = styled.li``;
const StatBar = styled.div``;
const StatValue = styled.span``;
const TypeList = styled.ul``;
const TypeItem = styled.li``;
const NameContainer = styled.div``;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${NameContainer} {
    display: flex;
    flex-direction: row;
    gap: 20px;
    & > h1 {
    }
  }

  & > ${Image} {
    width: 200px;
    height: 200px;
  }

  & > ${StatList} {
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

        & > div {
          background-color: #4caf50;
          height: 100%;
          border-radius: 4px;
          position: relative;

          & > ${StatValue} {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: #333;
            padding: 0 2px;
            border-radius: 2px;
            background-color: transparent;
          }
        }
      }
    }
  }

  & > ${TypeList} {
    list-style: none;
    padding: 0;
    display: flex;

    & > ${TypeItem} {
      padding: 5px 10px;
      margin-right: 8px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
`;

//#endregion

const Pokemon = () => {
  const { name } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [poke, setPoke] = useState(null);

  useEffect(() => {
    console.log(name);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getPokemonByName(name);
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
            <h1>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
            <LikeButton pokemon={poke} />
          </NameContainer>
          <Image src={poke.sprites?.front_default} alt={poke.name} />
          <h2>Statistiques</h2>
          <StatList>
            {poke.stats.map((stat, index) => (
              <StatItem key={index}>
                <span>{stat.stat.name} :</span>
                <StatBar>
                  <div style={{ width: `${(stat.base_stat / 255) * 100}%` }}>
                    <StatValue>{stat.base_stat}</StatValue>
                  </div>
                </StatBar>
              </StatItem>
            ))}
          </StatList>
          <h2>Types</h2>
          <TypeList>
            {poke.types?.map((type, index) => (
              <TypeItem key={index}>{type.type.name.toUpperCase()}</TypeItem>
            ))}
          </TypeList>
        </Container>
      )}
    </div>
  );
};

export default Pokemon;
