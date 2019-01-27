import React from "react";
import PropTypes from "prop-types";

interface IProps {
  topRated: any;
  popular: any;
  airingToday: any;
  loading: boolean;
  error: any;
}

const TVPresenter: React.SFC<IProps> = ({
  topRated,
  popular,
  airingToday,
  loading,
  error
}) => <div>TV</div>;

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default TVPresenter;
