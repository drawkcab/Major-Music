// React library
import React from 'react';

//Axios of AJax
import Axios from 'axios';

//import react sound components
import Sound from 'react-sound';

//import search component
import Search from '../components/search.component';

//import details component
import Details from '../components/details.component';

//import player components
import Player from '../components/player.component';

//import progress components
import Progress from '../components/progress.component';

//import footer components
import Footer from '../components/footer.component';


//appContainer class
class AppContainer extends React.Component {
  //AppContainer  constuctor
  constructor(props) {
    super(props);
    this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
    this.state = {
      track: {stream_url: '', title: '', artwork_url: ''},
      tracks: [],
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: ''
    };
  }

  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
  }

  //componentDidMount lifecucle method. Called once a component is loaded
  componentDidMount() {
    this.randomTrack();
  }

  formatMilliseconds(milliseconds){
    //format hours
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    //format minutes
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    //format seconds
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds  = milliseconds % 1000;

    //return string
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  forward(){
    this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
  }

  handleChange(event, value){

    //update input box
    this.setState({ autoCompleteValue: event.target.value});
    let _this = this;

    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
      .then(function (response) {
        //update track state
        _this.setState({tracks: response.data});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item});
  }

  handleSongFinished(){
    //call random track
    this.randomTrack();
  }

  handleSongPlaying(audio){
    this.setState({ elapsed: this.formatMilliseconds(audio.position),
      total: this.formatMilliseconds(audio.duration),
      position: audio.position / audio.duration })
  }

  prepareUrl(url){
    //attach client id to stream url
    return `${url}?client_id=${this.client_id}`
  }

  randomTrack() {
    let _this = this;

    //request for a playlist via Soundcloud using a client id
    Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
      .then(function (response) {
        //store the length of the tracks
        const trackLength = response.data.tracks.length;

        //pick a random track

        const randomNumber = Math.floor((Math.random() * trackLength) + 1);

        //set track state with a random track from playlists
        _this.setState({track: response.data.tracks[randomNumber]});
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  stop(){
    //stop sound
    this.setState({playStatus: Sound.status.STOPPED});
  }

  togglePlay(){
    //Check currrent play state
    if(this.state.playStatus === Sound.status.PLAYING){
      //pause if playing
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      //resume if paused
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }

  xlArtwork(url){
    return url.replace(/large/, 't500x500');
  }

  //Render method
  render() {
    const majorStyle ={
      width: '500px',
      height: '500px',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),   url(${this.xlArtwork(this.state.track.artwork_url)})`
    }
    return (
      <div className="major_music" style={majorStyle}>

        <Search
          autoCompleteValue={this.state.autoCompleteValue}
          tracks={this.state.tracks}
          handleSelect={this.handleSelect.bind(this)}
          handleChange={this.handleChange.bind(this)}/>

        <Details
          title={this.state.track.title}/>

        <Sound
          url={this.prepareUrl(this.state.track.stream_url)}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          playFromPosition={this.state.playFromPosition}
          onFinishedPlaying={this.handleSongFinished.bind(this)}/>

        <Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.randomTrack.bind(this)}/>

        <Progress
          elapsed={this.state.elapsed}
          total={this.state.total}
          position={this.state.position}/>
        <Footer />

      </div>
    );
  }
}

export default AppContainer
