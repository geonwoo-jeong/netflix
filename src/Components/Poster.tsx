import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CHANGE_BACKDROP } from "store";

// interface IProps {
//   id: number;
//   imageUrl: any;
//   rating: number;
//   year: any;
//   title: string;
//   isMovie?: boolean;
//   backdrop?: any;
// }

interface ImageProps {
  bgUrl: string;
}

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props: ImageProps) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster: React.SFC<any> = ({
  id,
  imageUrl,
  backdrop,
  title,
  rating,
  year,
  isMovie = false
}: any) => {
  const dispatch = useDispatch();

  const handleMouseHover = () => {
    dispatch({
      type: CHANGE_BACKDROP,
      payload: backdrop
    });
  };

  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container onMouseEnter={handleMouseHover}>
        <ImageContainer>
          <Image
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : require("assets/noPosterSmall.png")
            }
          />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐️
            </span>{" "}
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  );
};

// Poster.propTypes = {
//   id: PropTypes.number.isRequired,
//   imageUrl: PropTypes.string,
//   title: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired,
//   year: PropTypes.string,
//   isMovie: PropTypes.bool,
//   backdrop: PropTypes.any
// };

export default Poster;
