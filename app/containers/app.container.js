// React library
import React from 'react';

//Axios of AJax
import Axios from 'axios';

//appContainer class
class AppContainer extends React.Component {
  //AppContainer  constuctor
  constuctor(props) {
    super(props);
  }

  //componentDidMount lifecucle method. Called once a component is loaded
  componentDidMount() {
    this.randomTrack();
  }

  //Render method
  render() {
    return (
      <div className="major_music">

      </div>
    );
  }
}

export default AppContainer
