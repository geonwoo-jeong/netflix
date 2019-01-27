import React from "react";
import PropTypes from "prop-types";

interface IProps {
  movieResults: any;
  tvResults: any;
  searchTerm: string;
  loading: boolean;
  error: any;
  handleSubmit: any;
}

const SearchPresenter: React.SFC<IProps> = ({
  movieResults,
  tvResults,
  searchTerm,
  loading,
  error,
  handleSubmit
}) => <div>Search</div>;

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

export default SearchPresenter;
