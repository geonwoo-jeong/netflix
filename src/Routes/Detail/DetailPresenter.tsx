import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";

interface IProps {
  result: any;
  error: any;
  loading: boolean;
}

interface IBgImageProps {
  bgImage: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
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
  min-height: 80vh;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props: IBgImageProps) => props.bgImage});
  background-position: center center;
  background-size: cover;
  object-fit: scale-down;
  border-radius: 5px;
`;

const IMDB = styled.img.attrs({
  src:
    "https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
})`
  height: 20px;
  margin-right: 10px;
  object-fit: contain;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const CompanyContainer = styled.div`
  display: block;
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
  &:before {
    content: "•";
  }
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Youtube = styled.iframe`
  width: 500px;
  height: 315px;
  margin-bottom: 10px;
`;

const CompanyImage = styled.img`
  height: 100%;
  max-width: 100px;
  max-height: 50px;
  object-fit: contain;
  margin: 5px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
`;

const SeasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SeasonCover = styled.img`
  cursor: pointer;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const SeasonName = styled.h3`
  text-align: center;
`;

const DetailPresenter: React.SFC<IProps> = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading... | Netflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message color="#e74c3c" text={error} />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.title ||
            result.name ||
            result.original_title ||
            result.original_name}{" "}
          | Netflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path
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
        <Data>
          {result.videos &&
          result.videos.results &&
          result.videos.results.length ? (
            <Youtube
              src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div />
          )}
          <Title>
            {result.title ||
              result.name ||
              result.original_title ||
              result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IMDB />
                </a>
              )}
            </Item>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider />
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_runtime
                ? result.episode_run_time[0]
                : "0"}{" "}
              min
            </Item>
            <Divider />
            <Item>
              {result.genres &&
                result.genres.map((genre: any, index: number) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}{" "}
            </Item>
            <Divider />
            <Item>
              {result.production_countries &&
                result.production_countries[0].iso_3166_1}
            </Item>
            <Overview>{result.overview}</Overview>
          </ItemContainer>
          <CompanyContainer>
            {result.production_companies.length && <Title>Companies</Title>}
            {result.production_companies &&
              result.production_companies.map(
                (company: any, index: number) =>
                  company.logo_path && (
                    <>
                      <CompanyImage
                        key={index}
                        src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                        alt={company.name}
                      />
                    </>
                  )
              )}
          </CompanyContainer>
          {result.seasons && <Title>Seasons</Title>}
          <SeasonContainer>
            {result.seasons &&
              result.seasons.map(
                (season: any) =>
                  season.poster_path && (
                    <div key={season.id}>
                      {console.log(season)}
                      <SeasonCover
                        src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                        alt={season.overview}
                      />
                      <SeasonName>{season.name}</SeasonName>
                    </div>
                  )
              )}
          </SeasonContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
