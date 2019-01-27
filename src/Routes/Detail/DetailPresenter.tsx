import React from "react";
import PropTypes from "prop-types";

interface IProps {
  result: any;
  error: any;
  loading: boolean;
}

const DetailPresenter: React.SFC<IProps> = ({ result, error, loading }) => (
  <div>Detail</div>
);

DetailPresenter.propTypes = {
  result: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
