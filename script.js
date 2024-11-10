function proceed(blank, image) {
    if(confirm("Proceed to " + blank)) {
        document.getElementById('mapscreen').src = image;
    }
    }




//for keys (hidden)

function panning(direction) {
    //alert("You are now panning" + direction)
    switch(direction) {
        case 'to the left':
          translateX += panDistance;
          break;
        case 'to the right':
          translateX -= panDistance;
          break;
        case 'up':
          translateY += panDistance;
          break;
        case 'down':
          translateY -= panDistance;
          break;
      }
      updateMapTransform();
   }
    
function zoomingOut() {
    if (scale > minZoom) {
        scale = Math.max(scale / 1.2, minZoom); // min zoom level
        updateMapTransform();
      }
}

function zoomingIn() {
    if (scale < maxZoom) {
        scale = Math.min(scale * 1.2, maxZoom); // max zoom level
        updateMapTransform();
      }
}

//other functions
function pin() {
    if(confirm("Do you want to place a pin here?")){
      buffer() ;
    }
    }

function measure() {
    if(confirm("You are measuring the distance between the placed points")){
      buffer() ;
    }
    }

 function pin() {
    if(confirm("You are placing a pin here")) {
      buffer() ;
    }
    }


// ones that work w search

function buffer(){
    document.getElementById('buffer').style.display = 'flex';
    document.getElementById('search-container').style.display = 'none';
    
    
    setTimeout(function() {
      document.getElementById('buffer').style.display = 'none';
      document.getElementById('map').style.display = 'flex';
  }, 1500);

  revertSearchInput();
}

function revertSearchInput() {

  document.getElementById('search-container').innerHTML = `<input type="text" id="search-input" 
                                                            placeholder="Enter text and press Enter">
                                                          <button id="enter-btn">Enter</button>`;

    };

  


function placesWay(place) {
    if(confirm("Want to see " + place + " on the way?")) {

       buffer() ;

    }

    }
    

function placesNearby(place) {
     if(confirm("Want to see " + place + " nearby?")) {
        buffer();
     }
        }



// setting up zooming and panning

 let scale = 0.5; 
 let translateX = 0;
 let translateY = 0;

 
 const screenWidth = 1602; 
 const screenHeight = 1246; 
 const containerWidth = 2720; 
 const containerHeight = 1560; 

 const minZoom = 0.2; 
 const maxZoom = 10; 
 const panDistance = 10; 


 window.onload = function() {
    updateMapTransform();
  };

  
 

 function showMap() {
   document.getElementById('mapscreen').innerHTML = '<img id="map" src="map.png" alt="Map" width="1602">';
   updateMapTransform();
 }



 function updateMapTransform() {
   const map = document.getElementById('map');
   map.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
 }

 
 function zoomIn() {
    if(confirm("You are zooming in...")){
   if (scale < maxZoom) {
     scale = Math.min(scale * 1.2, maxZoom);
     updateMapTransform();
   }
   }
 }

 
 function zoomOut() {
    if(confirm("You are zooming out...")) {
   if (scale > minZoom) {
     scale = Math.max(scale / 1.2, minZoom);
     updateMapTransform();
   }
}
 }


 function pan(direction) {
    if(confirm("You are panning " + direction)){
   switch(direction) {
     case 'to the left':
       translateX += panDistance;
       break;
     case 'to the right':
       translateX -= panDistance;
       break;
     case 'up':
       translateY += panDistance;
       break;
     case 'down':
       translateY -= panDistance;
       break;
   }
   updateMapTransform();
}
 }


 function resetMap() {
    if(confirm("Do you want to revert to the original map?")) {
   scale = 0.5;
   translateX = 0;
   translateY = 0;
   updateMapTransform();
 }
}





//keys

 document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        panning('up');
    } else if (event.key === "ArrowDown") {
        panning('down');
    } else if (event.key === "ArrowLeft") {
        panning('to the left');
    } else if (event.key === "ArrowRight") {
        panning('to the right');
    } else if (event.key === "+") {
        zoomingIn();  
    }else if (event.key === "-") {
        zoomingOut();
    }
}
);





// serach input -- in progress

 // Function to display search input and set focus
 function showSearchInput(page) {

    // Show the search input
    document.getElementById('search-container').style.display = 'block';

    // Set focus to the input field
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    searchInput.focus();

    

    // Set event listener for the "Enter" button
    document.getElementById('enter-btn').onclick = function() {

      // Change the page content based on the search input
      
      changePageContent(page, searchInput.value);
      changePageContent() = null;

    };
  }

  // Function to change the page content based on search input
  function changePageContent(page, inputValue) {
   
    const screen = document.getElementById('search-container');

    // Hide the search input container after entering a value
    document.getElementById('search-input').style.display = 'none';

    document.getElementById('enter-btn').style.display = 'none';

    // Change the content based on the page
    if (page === 'From Location') {
    screen.innerHTML = `<center>
                        <h2>From Location</h2>
                        <p>You are starting from: ${inputValue}</p>
                        <button id = "ok" onclick="buffer()">OK</button>
                        </center>`;
     } else if (page === 'Destination Location') {
      screen.innerHTML = `<center>
                        <h2>Destination Location</h2>
                        <p>You are headed to: ${inputValue}</p>
                        <button id = "ok" onclick="buffer()">OK</button>
                        </center>`;
     } else if (page === 'Places on The Way') {
      screen.innerHTML = `<center>
                        <h2>Places on The Way...</h2>
                        <p>You are looking for : ${inputValue}</p>
                        <button id = "ok" onclick="buffer()">OK</button>
                        </center>`;
      } else if (page === 'Places Nearby') {
      screen.innerHTML = `<center>
                        <h2>Places Nearby</h2>
                        <p>You are looking for : ${inputValue}</p>
                        <button id = "ok" onclick="buffer()">OK</button>
                        </center>`;
    
    }
  }

   
