import Router from "Components/Router";
import * as React from "react";
import GlobalStyles from "./GlobalStyles";

class App extends React.Component {
  public render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
