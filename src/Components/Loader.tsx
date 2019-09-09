import React from "react";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 80vh;
  font-size: 28px;
  margin-top: 20px;
`;

const Loader: React.SFC = () => (
  <Container>
    <PacmanLoader sizeUnit={"px"} size={40} color={"#27ae60"} loading={true} />
  </Container>
);

export default Loader;
