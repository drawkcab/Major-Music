//ES6 Componenents
// Import React and React DOM
import React from 'react';
import ReactDOM from 'react-dom';

//Import search Component
import Search from './components/search.component';

//Import search Details
import Details from './components/details.component';

//Import search Player
import Player from './components/player.component';

//Import search Progress
import Progress from './components/progress.component';

//Import search Footer
import Footer from './components/footer.component';

class App extends React.Component {

  // render method is IMPORTANT
  // render returns jsx
  render() {
    return (
      <div>
        <Search />
        <Details title={'Track title'} />
        <Player />
        <Progress
          position={'0.3'}
          elapsed={'00:00'}
          total={'0:40'}/>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <App/> ,
  document.getElementById('content')
);
