import * as React from "react";
import Router from "Components/Router";
import Header from "./Header";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Router />
      </>
    );
  }
}

export default App;
