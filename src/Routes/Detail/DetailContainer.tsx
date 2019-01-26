import * as React from "react";
import DetailPresenter from "./DetailPresenter";
import { RouteComponentProps } from "react-router";
import { movieApi, tvApi } from "api";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  isMovie: boolean;
  result: any;
  error: any;
  loading: boolean;
}
class DetailContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    if (isMovie) {
      try {
        if (isMovie) {
          ({ data: result } = await movieApi.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
        }
      } catch {
        this.setState({ error: "Cant' find anything. " });
      } finally {
        this.setState({ loading: false, result });
      }
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

export default DetailContainer;
