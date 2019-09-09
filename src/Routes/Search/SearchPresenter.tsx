import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_BACKDROP } from "store";

interface IProps {
  movieResults: any;
  showResults: any;
  searchTerm: string;
  loading: boolean;
  error: any;
  handleSubmit: any;
  updateTerm: any;
}

interface IBgImageProps {
  bgImage: string;
}

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props: IBgImageProps) => props.bgImage});
  background-position: top center;
  background-size: center;
  background-repeat: no-repeat;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const SearchPresenter: React.SFC<IProps> = ({
  movieResults,
  showResults,
  searchTerm,
  loading,
  error,
  handleSubmit,
  updateTerm
}) => {
  const { backdrop } = useSelector((state: any) => state.backdrop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CHANGE_BACKDROP,
      payload: ""
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Search | Netflix</title>
      </Helmet>
      <Container>
        <Backdrop bgImage={`http://image.tmdb.org/t/p/original/${backdrop}`} />
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Search Movies or TV Shows..."
            value={searchTerm}
            onChange={updateTerm}
          />
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie: any) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title || movie.original_title}
                    rating={movie.vote_average}
                    backdrop={movie.backdrop_path}
                    year={
                      movie.release_date
                        ? movie.release_date.substring(0, 4)
                        : ""
                    }
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {showResults && showResults.length > 0 && (
              <Section title="TV Show Results">
                {showResults.map((show: any) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.name || show.original_name}
                    rating={show.vote_average}
                    backdrop={show.backdrop_path}
                    year={show.first_air_date.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
            {showResults &&
              movieResults &&
              showResults.length === 0 &&
              movieResults.length === 0 && (
                <Message text="Nothing found." color="#95a5a6" />
              )}
          </>
        )}
      </Container>
    </>
  );
};

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  showResults: PropTypes.array,
  searchTerm: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;
