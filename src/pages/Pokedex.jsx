import { useEffect, useState } from "react";
import { STORAGE_NAME } from "../global.jsx";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { getPokemonByName } from "../services/Api.service.jsx";

//#region css

const FavorisContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1400px;

  & > p {
    text-align: center;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: lightgray;
  font-size: 15px;
  border: none;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

//#endregion

function Pokedex() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState([]);

  const fetchPokemonByName = (value) => {
    return getPokemonByName(value)
      .then((result) => result)
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
        throw error;
      });
  };

  function deleteAllSaved() {
    if (STORAGE_NAME in localStorage) localStorage.removeItem(STORAGE_NAME);
    setSaved([]);
  }

  useEffect(() => {
    setIsLoading(true);
    let storedSaved = localStorage[STORAGE_NAME];
    if (!storedSaved) {
      setIsLoading(false);
    } else {
      storedSaved = JSON.parse(storedSaved);
      const promises = [];
      for (const key in storedSaved) {
        promises.push(fetchPokemonByName(key));
      }
      Promise.all(promises).then((values) => {
        setIsLoading(false);
        setSaved(values.filter((value) => value));
      });
    }
  }, []);

  return (
    <FavorisContainer>
      <h1>Pokemon enregistré</h1>
      {saved.length === 0 && !isLoading && !error && (
        <p className="text-secondary fst-italic">
          Vous n&apos;avez enregistré aucun évènement.
        </p>
      )}
      {error && <Error err={error} />}
      {isLoading && <Loader />}
      <Cards>
        {!error &&
          !isLoading &&
          saved &&
          saved.map((item) => item && <Card key={item.id} pokemon={item} />)}
      </Cards>
      {!error && !isLoading && saved.length > 0 && (
        <div>
          <DeleteButton onClick={deleteAllSaved}>Tout supprimer</DeleteButton>
        </div>
      )}
    </FavorisContainer>
  );
}

export default Pokedex;
