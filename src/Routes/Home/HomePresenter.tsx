import * as React from "react";

interface IProps {
  nowPlaying: any;
  upcoming: any;
  popular: any;
  error: any;
  loading: boolean;
}

const HomePresenter: React.SFC<IProps> = () => <div>Home</div>;

export default HomePresenter;
