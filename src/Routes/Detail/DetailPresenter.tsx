import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";
// @ts-ignore
import StarRatings from "react-star-ratings";

interface IProps {
  result: any;
  error: any;
  loading: boolean;
}

interface IBgImageProps {
  bgImage: string;
}

const Container = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
  min-height: 90vh;
  position: relative;
  padding: 4vw;
  background-color: black;
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
  z-index: 0;
`;

const Content = styled.div`
  display: grid;
  width: 60vw;
  min-height: 80vh;
  position: relative;
  z-index: 1;
`;

const Cover = styled.img.attrs((props: any) => ({
  src: props.bgImage
}))`
  height: 400px;
  width: 300px;
  object-fit: contain;
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
  width: 100%;
  margin-left: 10px;
`;

const Title = styled.h1`
  display: block;
  font-size: 32px;
  margin: 20px 0;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 300px 1fr;
  margin: 20px 0px;
`;

const Item = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px 1fr;
  font-size: 16px;
  margin: 10px 0;
`;

const ItemTitle = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const Overview = styled.p`
  font-size: 12px;
  line-height: 1.5;
  width: 100%;
`;

const Youtube = styled.iframe`
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
`;

const CompanyImage = styled.img`
  max-width: 100px;
  height: 50px;

  object-fit: contain;
  margin: 5px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
`;

const CompanyName = styled.span`
  display: flex;
  align-items: center;
  max-width: 100px;
  text-align: center;
  font-size: 12px;
  padding: 0 10px;
`;

const SeasonContainer = styled.div`
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SeasonInnerContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 200px 1fr;
  margin: 10px 0;
`;

const SeasonContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
`;

const SeasonCover = styled.img`
  cursor: pointer;
  width: 200px;
  height: 200px;
  object-fit: contain;
  object-position: 50% 50%;
`;

const SeasonName = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin: 20px 0;
`;

const Companies = styled.span`
  display: flex;
`;

const Company = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
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
        <ItemContainer>
          {console.log(result)}
          <Cover
            src={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Item>
              <ItemTitle>RATING</ItemTitle>
              <StarRatings
                rating={result.vote_average / 2}
                starRatedColor="#f1c40f"
                name="rating"
                starDimension="30px"
                starSpacing="2px"
              />
              {/* <div>{result.vote_average}</div> */}
            </Item>
            <Item>
              <ItemTitle>TITLE</ItemTitle>
              {result.title ||
                result.name ||
                result.original_title ||
                result.original_name}
            </Item>
            <Item>
              <ItemTitle>ORIGINAL TITLE</ItemTitle>
              <div>{result.original_title || result.original_name}</div>
            </Item>
            <Item>
              <ItemTitle>COUNTRIES</ItemTitle>
              <div>
                {result.production_countries &&
                  result.production_countries.map(
                    (contry: any, index: number) =>
                      index === result.production_countries.length - 1
                        ? contry.iso_3166_1
                        : `${contry.iso_3166_1} / `
                  )}
                {result.origin_country &&
                  Array.from(result.origin_country).map(
                    (country: any, index: number) =>
                      index === result.origin_country.length - 1
                        ? country
                        : `${country} / `
                  )}
              </div>
            </Item>
            <Item>
              <ItemTitle>YEAR</ItemTitle>
              <div>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date
                  ? result.first_air_date.substring(0, 4)
                  : "Undecided"}
              </div>
            </Item>
            <Item>
              <ItemTitle>RUN TIME</ItemTitle>
              <div>
                {result.runtime
                  ? result.runtime
                  : result.episode_runtime
                  ? result.episode_run_time[0]
                  : "0"}{" "}
                min
              </div>
            </Item>
            <Item>
              <ItemTitle>GENRES</ItemTitle>
              <div>
                {result.genres &&
                  result.genres.map((genre: any, index: number) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}{" "}
              </div>
            </Item>
            <Item>
              <ItemTitle>WEBSITE</ItemTitle>
              <ItemContent>
                {result.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IMDB />
                  </a>
                )}
                {result.homepage && (
                  <a
                    href={result.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OFFICIAL
                  </a>
                )}
              </ItemContent>
            </Item>
            <Item>
              <ItemTitle>COMPANIES</ItemTitle>
              <Companies>
                {result.production_companies &&
                  result.production_companies.map(
                    (company: any, index: number) =>
                      company.logo_path ? (
                        <Company key={index}>
                          <CompanyImage
                            src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                            alt={company.name}
                          />
                          <CompanyName key={index}>{company.name}</CompanyName>
                        </Company>
                      ) : (
                        <Company key={index}>
                          <CompanyImage src={``} />
                          <CompanyName key={index}>{company.name}</CompanyName>
                        </Company>
                      )
                  )}
              </Companies>
            </Item>
          </Data>
        </ItemContainer>
        <SeasonContainer>
          {result.overview && <Title>Overview</Title>}
          <Overview>{result.overview}</Overview>
        </SeasonContainer>
        {result.seasons && <Title>Seasons</Title>}
        <SeasonContainer>
          {result.seasons &&
            result.seasons.map(
              (season: any) =>
                season.poster_path && (
                  <SeasonInnerContainer key={season.id}>
                    <div>
                      <SeasonCover
                        src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                        alt={season.overview}
                      />
                    </div>
                    <SeasonContent>
                      <SeasonName>
                        {season.name && season.name}{" "}
                        {season.air_date &&
                          `(${season.air_date.substring(0, 4)})`}
                      </SeasonName>
                      <div>{season.overview}</div>
                    </SeasonContent>
                  </SeasonInnerContainer>
                )
            )}
        </SeasonContainer>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
