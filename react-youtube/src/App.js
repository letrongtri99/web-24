import React from 'react';
import _ from "lodash";
import './App.css';
let nextPageToken;
class App extends React.Component {
  state = {
    listResult: [],
    wordFind: ' '
  };
  // debounceEvent(...args){
  //   this.debounceEvent = debounce(...args);
  //   return e=>{
  //     e.persist();
  //     return this.debounceEvent(e);
  //   };
  // }
  showResult = _.debounce((event) => {
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
        nextPageToken = data.nextPageToken;
        this.setState({
          listResult: data.items,
        });
      });
    // window.onscroll = function (event) {
    //   event.preventDefault();
    //   var d = document.documentElement;
    //   var offset = d.scrollTop + window.innerHeight;
    //   var height = d.offsetHeight;

    //   console.log('offset = ' + offset);
    //   console.log('height = ' + height);
    //   if (offset === height) {
    //     fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.wordFind}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //       .then((res) => {
    //         return res.json();
    //       })
    //       .then((data) => {
    //         nextPageToken = data.nextPageToken;
    //         this.setState({
    //           listResult: data.items,
    //         })
    //       });
    //   }
    // }
  }, 1000);
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
                }}></input>
                <br></br>
              </div>
            </form>
          </div>
        </div>
        {this.state.listResult.map((item, index) => {
          return (
            <a className="result col-md-12" href={`https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`} target="blank">
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

    );
  }
}

export default App;
