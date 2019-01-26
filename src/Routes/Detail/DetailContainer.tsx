import * as React from "react";
import DetailPresenter from "./DetailPresenter";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}
class DetailContainer extends React.Component<IProps> {
  state = {
    result: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

export default DetailContainer;
