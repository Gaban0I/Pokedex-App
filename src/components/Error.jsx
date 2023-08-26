import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorMessage = styled.p`
  background-color: #dc3545;
  color: #fff;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Error = ({ err }) => {
  return (
    <ErrorContainer>
      <ErrorMessage>Erreur: {err}</ErrorMessage>
    </ErrorContainer>
  );
};

Error.propTypes = {
  err: PropTypes.string,
};

Error.defaultProps = {
  err: "Une erreur s'est produite.",
};

export default Error;
