import * as React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "api";

class HomeContainer extends React.Component {
  public state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  public async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying }
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await movieApi.upcoming();
      const {
        data: { results: popular }
      } = await movieApi.popular();

      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Cant' find movies information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  public render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;

    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

export default HomeContainer;
