import React from "react";
import PropTypes from "prop-types";

interface IProps {
  nowPlaying: any;
  upcoming: any;
  popular: any;
  error: any;
  loading: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
  nowPlaying,
  upcoming,
  popular,
  error,
  loading
}) => <div>Home</div>;

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default HomePresenter;
