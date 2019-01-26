import * as React from "react";

interface IProps {
  result: any;
  error: any;
  loading: boolean;
}

const DetailPresenter: React.SFC<IProps> = () => <div>Detail</div>;

export default DetailPresenter;
