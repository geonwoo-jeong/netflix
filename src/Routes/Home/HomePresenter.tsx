import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";

interface IProps {
  nowPlaying: any;
  upcoming: any;
  popular: any;
  error: any;
  loading: boolean;
}

const Container = styled.div`
  padding: 0px 10px;
`;

const HomePresenter: React.SFC<IProps> = ({
  nowPlaying,
  upcoming,
  popular,
  error,
  loading
}) =>
  loading ? null : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie: any) => movie.title)}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Playing">
          {upcoming.map((movie: any) => movie.title)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Playing">
          {popular.map((movie: any) => movie.title)}
        </Section>
      )}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default HomePresenter;
