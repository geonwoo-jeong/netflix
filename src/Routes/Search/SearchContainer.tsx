import * as React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "api";

class SearchContainer extends React.Component {
  state = {
    movieResults: null,
    showResults: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      searchTerm: value
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const {
        data: { results: movieResults }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: showResults }
      } = await tvApi.search(searchTerm);
      this.setState({ movieResults, showResults });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      showResults,
      searchTerm,
      loading,
      error
    } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        showResults={showResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}

export default SearchContainer;
