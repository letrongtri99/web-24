window.onload=()=>{
    var text = document.getElementById("keyword");
    var submit = document.getElementById("sub");
    
    let nextPageToken; 
    
    function debounce(func, wait) {
        var timeout;
      
        return function() {
          var context = this,
              args = arguments;
      
          var executeFunction = function() {
            func.apply(context, args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(executeFunction, wait);
        };
      };
    text.addEventListener('input',debounce(()=>{
        var myDiv = document.getElementById("result-list");
        while(myDiv.firstChild){
            myDiv.removeChild(myDiv.firstChild);
        }
        document.getElementById("loading").innerHTML="Loading."
    },550));
    text.addEventListener('input',debounce(()=>{
        var myDiv = document.getElementById("result-list");
        while(myDiv.firstChild){
            myDiv.removeChild(myDiv.firstChild);
        }
        document.getElementById("loading").innerHTML="Loading.."
    },950));
    text.addEventListener('input',debounce(()=>{
        var myDiv = document.getElementById("result-list");
        while(myDiv.firstChild){
            myDiv.removeChild(myDiv.firstChild);
        }
        document.getElementById("loading").innerHTML="Loading..."
    },1500));
    text.addEventListener('keyup',debounce((event)=>{
        var myDiv = document.getElementById("result-list");
        while(myDiv.firstChild){
            myDiv.removeChild(myDiv.firstChild);
        }
        setTimeout(()=>{document.getElementById("loading").innerHTML=" "},0);
        event.preventDefault();
        console.log(text.value);
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={${text.value}}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
          .then((res)=>{
              return res.json();
          })
          .then((data)=>{
              if(data.items.length === 0){
                const out = document.getElementById("result-list");
                out.insertAdjacentHTML(
                    `beforeend`,
                `<h4 class="error">Not found video</h4>`
                );
              }
              else{
                console.log(data);
                nextPageToken = data.nextPageToken;
                for(let i=0;i<data.items.length;i++){
                    const title = data.items[i].snippet.title;
                    const thumbnailsurl = data.items[i].snippet.thumbnails.medium.url;
                    const description = data.items[i].snippet.description;
                    const videoId = data.items[i].id.videoId;
                  const out = document.getElementById("result-list");
                  out.insertAdjacentHTML(
                      `beforeend`,
                  
                      `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" target="blank">
                      <img src="${thumbnailsurl}" alt=""/>
                      <div class="video_info">
                          <h2 class="title">${title}</h2>
                          <p class="description">${description}</p>
                          <span>View >></span>
                      </div>    
                      </a>
                      `
                  );
  
  
                }
              }

              

            
          });
    },2000));
    window.onscroll = function(event) {
        event.preventDefault();
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;
      
        console.log('offset = ' + offset);
        console.log('height = ' + height);
      
        if (offset === height) {
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={${text.value}}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                },
            })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    nextPageToken = data.nextPageToken;
                    console.log(data);
                    for(let i=0;i<data.items.length;i++){
                        const title = data.items[i].snippet.title;
                        const thumbnailsurl = data.items[i].snippet.thumbnails.medium.url;
                        const description = data.items[i].snippet.description;
                        const videoId = data.items[i].id.videoId
                      //   console.log(title);
                      //   console.log(thumbnailsurl);
                      //   console.log(description);
                      const out = document.getElementById("result-list")
                      out.insertAdjacentHTML(
                          `beforeend`,
                      
                          `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" target="blank">
                          <img src="${thumbnailsurl}" alt=""/>
                          <div class="video_info">
                              <h2 class="title">${title}</h2>
                              <p class="description">${description}</p>
                              <span>View >></span>
                          </div>    
                          </a>
                          `
                      );
      
      
                    }
                })
        }
      };
}
