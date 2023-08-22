import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  width: 100vw;
  height: 100vh;
`;

const SwipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  width: 400px;
  max-width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
`;

const Button = styled.button`
  border-radius: 8px;
  padding: 12px 24px;
  margin: 0 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => (props.like ? "green" : "red")};
`;

const STORAGE_NAME = "PokeSwipe_734a1dc0-26df-11ee-be56-0242ac120002";

export default function App() {
    const [poke, setPoke] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeUrl, setPokeUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [likedPokemons, setLikedPokemons] = useState({});

    useEffect(() => {
      getPoke();
    }, []);
    useEffect(() => {
      (async () => {
        const dataStore = localStorage.getItem(STORAGE_NAME);
        setLikedPokemons(JSON.parse(dataStore) || {});
      })();
    }, []);

    const handleSetFav = (id) => {
      let dataStore = localStorage.getItem(STORAGE_NAME);
      if (!dataStore) {
        const newSavedStorage = {};
        newSavedStorage[id] = id;
        localStorage.setItem(STORAGE_NAME, JSON.stringify(newSavedStorage));
      } else {
        dataStore = JSON.parse(dataStore);
        dataStore[id] = id;
        localStorage.setItem(STORAGE_NAME, JSON.stringify(dataStore));
      }
    };

    const clearAllData = () => {
      try {
        localStorage.clear();
      } catch (e) {
        console.error(e);
      }
    };

    const getPoke = async () => {
      try {
        const response = await fetch(pokeUrl);
        const json = await response.json();
        setPokeUrl(json.next);
        const pokeList = await Promise.all(
          json.results.map(async (poke) => {
            const res = await fetch(poke.url);
            const data = await res.json();
            return data;
          })
        );
        setPoke((prevPoke) => [...prevPoke, ...pokeList]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSwipe = (direction) => {
      if (direction === "right") {
        handleLike();
      } else if (direction === "left") {
        handleDislike();
      }
      if (currentIndex === poke.length - 2) getPoke();
      setCurrentIndex(currentIndex + 1);
    };

    const handleLike = () => {
      handleSetFav(poke[currentIndex].id);
      if (currentIndex === poke.length - 2) getPoke();
      setCurrentIndex(currentIndex + 1);
    };

    const handleDislike = () => {
      if (currentIndex === poke.length - 2) getPoke();
      setCurrentIndex(currentIndex + 1);
    };

    const renderPokeCards = () => {
      if (isLoading) {
        return <Loading />;
      }
      if (currentIndex >= poke.length) {
        return <div>No more Pokémon to show!</div>;
      }
      return poke.map((p, index) => {
        if (index === currentIndex) {
          const isLiked = likedPokemons[p.id] !== undefined;
          if (isLiked) {
            if (currentIndex === poke.length - 2) getPoke();
            setCurrentIndex(currentIndex + 1);
            return null;
          }
          return (
            <div key={p.name}>
              <Card
                name={p.name}
                sprite={p.sprites?.front_default}
                id={p.id}
                height={p.height}
                weight={p.weight}
                type={p.types[0].type.name}
              />
            </div>
          );
        }
        return null;
      });
    };

    return (
      <Container>
        <SwipeContainer>
          {renderPokeCards()}
          <ButtonsContainer>
            <Button onClick={() => handleSwipe("left")}>Dislike</Button>
            <Button like onClick={() => handleSwipe("right")}>Like</Button>
          </ButtonsContainer>
        </SwipeContainer>
      </Container>
    );
}
