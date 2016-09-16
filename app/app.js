//ES6 Componenents
// Import React and React DOM
import React from 'react';
import ReactDOM from 'react-dom';

//Import App container
import AppContainer from './containers/app.container';

class App extends React.Component {

  // render method is IMPORTANT
  // render returns jsx
  render() {
    return (
      <AppContainer />
    );
  }
}

ReactDOM.render(
  <App/> ,
  document.getElementById('content')
);
