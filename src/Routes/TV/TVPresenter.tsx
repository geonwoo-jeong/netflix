import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_BACKDROP } from "store";

interface IProps {
  topRated: any;
  popular: any;
  airingToday: any;
  loading: boolean;
  error: any;
}

interface IBgImageProps {
  bgImage: string;
}

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

const Container = styled.div`
  padding: 50px;
`;

const TVPresenter: React.SFC<IProps> = ({
  topRated,
  popular,
  airingToday,
  loading,
  error
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
        <title>TV Shows | Netflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Backdrop
            bgImage={`http://image.tmdb.org/t/p/original/${backdrop}`}
          />
          {topRated && topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name || show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  backdrop={show.backdrop_path}
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name || show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  backdrop={show.backdrop_path}
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.length > 0 && (
            <Section title="Airing Today">
              {airingToday.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  backdrop={show.backdrop_path}
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

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default TVPresenter;
