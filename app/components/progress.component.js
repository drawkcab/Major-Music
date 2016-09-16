//Here comes react
import React from 'react';

//create Progress component class
class Progress extends React.Component {

  //render method
  render() {

    return(
      <div className="progress">
        <span className="player__time-elapsed">{this.props.elapsed}</span>
        <progress
          value={this.props.position}
          max="1">
        </progress>

        <span className="player__time-total">{this.props.total}</span>
      </div>
    )
  }
}

//export Progress
export default Progress
