import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../features/likesSlice";

const LikeButtonContainer = styled.button`
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: all 0.2s linear;
  padding-top: 5px;

  &:hover {
    border: 1px solid black;
  }

  &.liked {
    border: 1px solid red;
    &:hover {
      border: none;
    }
  }

  svg {
    fill: ${(props) => (props.liked ? "#f44336" : "gray")};
    transition: fill 0.2s linear;
  }

  &:hover svg {
    fill: ${(props) => (props.liked ? "#f44336" : "black")};
  }
`;

const HeartSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 32 32"
  >
    <path d="M16.043 28.627C12.139 25.028 2 15.314 2 9.344 2 5.082 5.582 2 10.186 2 13.07 2 15.402 3.72 16 4.342 16.598 3.72 18.931 2 21.814 2 26.418 2 30 5.082 30 9.344c0 5.97-10.14 15.684-13.957 19.283l-.485.408-.515-.408z" />
  </svg>
);

const LikeButton = ({ pokemon }) => {
  const dispatch = useDispatch();
  const isLiked = useSelector((state) => state.likes[pokemon.id] || false);

  const handleLikeClick = () => {
    dispatch(toggleLike({ pokemonId: pokemon.id }));
  };

  return (
    <LikeButtonContainer
      liked={isLiked} // Utilisez le state du store Redux
      onClick={handleLikeClick}
      className={isLiked ? "liked" : ""}
    >
      <HeartSVG />
    </LikeButtonContainer>
  );
};

LikeButton.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default LikeButton;
