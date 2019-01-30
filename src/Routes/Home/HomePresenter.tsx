import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

interface IProps {
  nowPlaying: any;
  upcoming: any;
  popular: any;
  error: any;
  loading: boolean;
}

const Container = styled.div`
  padding: 20px;
`;

const HomePresenter: React.SFC<IProps> = ({
  nowPlaying,
  upcoming,
  popular,
  error,
  loading
}) => (
  <>
    <Helmet>
      <title>Movies | Netflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
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

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default HomePresenter;
