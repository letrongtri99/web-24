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
      
    text.addEventListener('keyup',debounce((event)=>{
        var myDiv = document.getElementById("result-list");
        while(myDiv.firstChild){
            myDiv.removeChild(myDiv.firstChild);
        }
    
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
              console.log(data);
              nextPageToken = data.nextPageToken;
              for(let i=0;i<data.items.length;i++){
                  const title = data.items[i].snippet.title;
                  const thumbnailsurl = data.items[i].snippet.thumbnails.medium.url;
                  const description = data.items[i].snippet.description;
                  const videoId = data.items[i].id.videoId;
                  
                //   console.log(title);
                //   console.log(thumbnailsurl);
                //   console.log(description);
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
              

            
          });
        
          
        //   document.getElementsByClassName("container")[0].insertAdjacentHTML(
        //     `beforeend`,
        //     `<button type="button" id="readmore">Read more >></button>`
        // );
    },2000));
    // const container = document.getElementsByClassName("container")[0];

    // const button = document.getElementById("readmore");
    // button.addEventListener('click',(event)=>{
    //                   fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={${text.value}}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,{
    //             method:'GET',
    //             headers:{
    //             'Content-Type':'application/json',
    //             },
    //         })
    //             .then((res)=>{
    //                 return res.json();
    //             })
    //             .then((data)=>{
    //                 nextPageToken = data.nextPageToken;
    //                 console.log(data);
    //                 for(let i=0;i<data.items.length;i++){
    //                     const title = data.items[i].snippet.title;
    //                     const thumbnailsurl = data.items[i].snippet.thumbnails.medium.url;
    //                     const description = data.items[i].snippet.description;
    //                     const videoId = data.items[i].id.videoId
    //                   //   console.log(title);
    //                   //   console.log(thumbnailsurl);
    //                   //   console.log(description);
    //                   const out = document.getElementById("result-list")
    //                   out.insertAdjacentHTML(
    //                       `beforeend`,
                      
    //                       `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" target="blank">
    //                       <img src="${thumbnailsurl}" alt=""/>
    //                       <div class="video_info">
    //                           <h2 class="title">${title}</h2>
    //                           <p class="description">${description}</p>
    //                           <span>View >></span>
    //                       </div>    
    //                       </a>
    //                       `
    //                   );
      
      
    //                 }
    //             })
    // });
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
