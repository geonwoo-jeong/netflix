import * as React from "react";

interface IProps {
  movieResults: any;
  tvResults: any;
  searchTerm: string;
  loading: boolean;
  error: any;
  handleSubmit: any;
}

const SearchPresenter: React.SFC<IProps> = () => <div>Search</div>;

export default SearchPresenter;
