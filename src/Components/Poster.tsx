import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  id: number;
  imageUrl: any;
  rating: number;
  year: any;
  title: string;
  isMovie?: boolean;
}

interface ImageProps {
  bgUrl: string;
}

const Container = styled.div``;

const ImageContainer = styled.div``;

const Image = styled.div`
  background-image: url(${(props: ImageProps) => props.bgUrl});
`;

const Rating = styled.span``;

const Title = styled.span``;

const Year = styled.span``;

const Poster: React.SFC<IProps> = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false
}) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl} />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  year: PropTypes.string,
  isMovie: PropTypes.bool
};

export default Poster;
