import React from 'react';
import _ from "lodash";
import './App.css';

class App extends React.Component {
  state = {
    listResult: [],
    wordFind: ' ',
    nextPageToken: ' ',
  };
  // debounceEvent(...args){
  //   this.debounceEvent = debounce(...args);
  //   return e=>{
  //     e.persist();
  //     return this.debounceEvent(e);
  //   };
  // }
  clean=()=>{
    document.getElementById("result").innerHTML=" ";
  }
  showFirst = _.debounce(() => {
    document.getElementById("loading").innerHTML = "Loading.";
  }, 500);
  show = _.debounce(() => {
    document.getElementById("loading").innerHTML = "Loading..";
  }, 1000);
  showAfter = _.debounce(() => {
    document.getElementById("loading").innerHTML = "Loading...";
  }, 1500);
  showResult = _.debounce((event) => {
    document.getElementById("loading").innerHTML = " ";
    // event.preventDefault();
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.wordFind}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          listResult: [...this.state.listResult,...data.items],
          nextPageToken: data.nextPageToken,
        });
      });
    window.onscroll = function (event) {
      event.preventDefault();
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;

      console.log('offset = ' + offset);
      console.log('height = ' + height);
      if (offset === height) {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.wordFind}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${this.state.nextPageToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.setState({
              listResult: [...this.state.listResult,...data.items],
              nextPageToken:data.nextPageToken,
            })
          });
      }
    }
  }, 2000);
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img className="head" src="https://www1-lw.xda-cdn.com/files/2017/08/After-12-Years-Google-Gives-YouTube-a-New-Logo.png" alt=""></img>
            <h1>Let's search</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <form id="search" onInput={this.showResult}>
              <div className="form-group">
                <input type="text" value={this.state.wordFind} className="form-control" required onInput={(event) => {
                  this.setState({
                    wordFind: event.target.value,
                  });
                  this.showFirst();
                  this.show();
                  this.showAfter();
                  // this.showResult();
                }}></input>
                <br></br>
              </div>
            </form>
          </div>
        </div>
        <div id="loading"></div>
        <div id="result">
          {this.state.listResult.map((item, index) => {
            return (
              <a key={index} className="result col-md-12" href={`https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`} target="blank">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div class="video_info">
                  <h2 class="title">{item.snippet.title}</h2>
                  <p class="description">{item.snippet.description}</p>
                  <span>View >></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

    );
  }
}

export default App;
