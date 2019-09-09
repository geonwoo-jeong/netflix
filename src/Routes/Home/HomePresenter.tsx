import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_BACKDROP } from "store";

// interface IProps {
//   nowPlaying: any;
//   upcoming: any;
//   popular: any;
//   error: any;
//   loading: boolean;
//   Partial: any;
// }

interface IBgImageProps {
  bgImage: string;
}

const Container = styled.div`
  padding: 4vw;
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

const HomePresenter: React.SFC<any> = ({
  nowPlaying,
  upcoming,
  popular,
  error,
  loading
}: any) => {
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
        <title>Movies | Netflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Backdrop
            bgImage={`http://image.tmdb.org/t/p/original/${backdrop}`}
          />

          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title || movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  backdrop={movie.backdrop_path}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Playing">
              {upcoming.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  rating={movie.vote_average}
                  imageUrl={movie.poster_path}
                  title={movie.title || movie.original_title}
                  year={movie.release_date.substring(0, 4)}
                  backdrop={movie.backdrop_path}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Playing">
              {popular.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  rating={movie.vote_average}
                  imageUrl={movie.poster_path}
                  title={movie.title || movie.original_title}
                  year={movie.release_date.substring(0, 4)}
                  backdrop={movie.backdrop_path}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};

// HomePresenter.propTypes = {
//   nowPlaying: PropTypes.array,
//   popular: PropTypes.array,
//   upcoming: PropTypes.array,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string
// };

export default HomePresenter;
