import * as React from "react";

interface IProps {
  topRated: any;
  popular: any;
  airingToday: any;
  loading: boolean;
  error: any;
}

const TVPresenter: React.SFC<IProps> = () => <div>TV</div>;

export default TVPresenter;
