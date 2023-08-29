import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getPokemonList, getPokemonByName } from "../services/Api.service";
import ReactPaginate from "react-paginate";
import "../styles/Poketrap.css";

//#region css

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1400px;
`;

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
`;

const DeleteSearch = styled.button`
  background-color: transparent;
  color: lightgray;
  font-size: 15px;
  border: none;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  height: 40px;
  width: 50vw;
  max-width: 250px;
  padding: 5px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px 0px 0px 20px;
`;

const SearchButton = styled.button`
  height: 40px;
  width: 40px;
  border: 2px solid black;
  border-left: 0px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:active {
    transform: translateY(4px);
  }
`;

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
//#endregion

export default function App() {
  const [poke, setPoke] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [val, setVal] = useState("");
  const [IndexNumber, setIndexNumber] = useState(0);
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    getPoke(1);
  }, []);

  const change = (event) => {
    setVal(event.target.value);
  };

  const getPokeByName = async (value) => {
    setOnSearch(true);
    setVal("");
    if (value.trim() !== "") {
      setIsLoading(true);
      try {
        const pokeData = await getPokemonByName(value.toLowerCase());
        setError(null);
        console.log(pokeData);
        setPoke([pokeData]);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      getPoke(1);
      setOnSearch(false);
    }
  };

  const getPoke = async (value) => {
    setOnSearch(false);
    try {
      setIsLoading(true);
      const pokeList = await getPokemonList((value - 1) * 10, 10);
      setIndexNumber(Math.ceil(pokeList.count / 10));
      const pokeListData = await Promise.all(
        pokeList.results.map(async (poke) => {
          return getPokemonByName(poke.name);
        })
      );
      setError(null);
      setPoke(pokeListData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getPokeByName(val);
    }
  }

  const handlePageClick = (data) => {
    getPoke(data.selected + 1);
  };

  return (
    <Container>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Rechercher un Pokemon..."
          aria-label="Rechercher un Pokemon..."
          aria-describedby="button-addon"
          value={val}
          onChange={change}
          onKeyDown={handleKeyDown}
        />
        <SearchButton
          type="button"
          id="button-addon"
          onClick={() => getPokeByName(val)}
        >
          <i className="bi bi-search"></i>
        </SearchButton>
      </SearchInputContainer>
      {!isLoading && onSearch && (
        <DeleteSearch onClick={() => getPoke(1)}>
          effacer la recherche
        </DeleteSearch>
      )}
      {error && <Error err={error} />}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <Cards>
          {poke.map((p) => (
            <Card key={p.id} pokemon={p} />
          ))}
        </Cards>
      )}
      {!error && !onSearch && (
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={IndexNumber}
          previousLabel={
            <>
              <i className="bi bi-arrow-left-short"></i> précédent
            </>
          }
          nextLabel={
            <>
              suivant <i className="bi bi-arrow-right-short"></i>
            </>
          }
          containerClassName="paginationContainer"
          breakLabel="..."
          activeClassName="active"
          pageClassName="page"
          breakClassName="break"
          renderOnZeroPageCount={null}
        />
      )}
    </Container>
  );
}
