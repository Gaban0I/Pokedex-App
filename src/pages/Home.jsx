import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getPokemonList, getPokemonByName } from "../ApiService";
import ReactPaginate from "react-paginate";

//#region css

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
`;
const SearchInput = styled.input`
  height: 40px;
  width: 250px;
  padding: 5px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px 0px 0px 20px;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [IndexNumber, setIndexNumber] = useState(0);

  useEffect(() => {
    getPoke();
  }, []);

  const change = (event) => {
    setVal(event.target.value);
  };

  const getPokeByName = async (value) => {
    if (value !== "") {
      setCurrentIndex(1);
      setIsLoading(true);
      try {
        const pokeData = await getPokemonByName(value);
        setError(null);
        setPoke([pokeData]);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      getPoke();
    }
  };

  const getPoke = async () => {
    try {
      setIsLoading(true);
      const pokeList = await getPokemonList((currentIndex - 1) * 10, 10);
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

  const handlePageClick = (data) => {
    setCurrentIndex(data.selected + 1);
    getPoke();
    console.log(currentIndex);
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
        />
        <SearchButton
          type="button"
          id="button-addon"
          onClick={() => getPokeByName(val)}
        >
          <i className="bi bi-search"></i>
        </SearchButton>
      </SearchInputContainer>
      {error && <Error err={error} />}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <Cards>
          {poke.map((p) => (
            <Card key={p.id} pokemon={p} />
          ))}
        </Cards>
      )}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={IndexNumber}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </Container>
  );
}
