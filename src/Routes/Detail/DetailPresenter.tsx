import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";

interface IProps {
  result: any;
  error: any;
  loading: boolean;
}

interface IBgImageProps {
  bgImage: string;
}

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props: IBgImageProps) => props.bgImage});
  background-position: center center;
  background-size: center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props: IBgImageProps) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const DetailPresenter: React.SFC<IProps> = ({ result, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={
          result && result.backdrop_path
            ? `http://image.tmdb.org/t/p/original${result.backdrop_path}`
            : ""
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
