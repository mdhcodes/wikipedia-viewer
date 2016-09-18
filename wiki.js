var searchWikipedia = function() {
  // Get the string entered in the search field
  var inputText = document.getElementById("search-subject").value;

  var resultsDiv = document.getElementById("results");

    // Clear the previous search results before listing the current search results
    if(resultsDiv !== " ") {
      resultsDiv.innerHTML = '<div id="results"></div>';
    }

  // Create a new HTTP request
  var req = new XMLHttpRequest();
  // Save the URL to access the API in a variable named url which includes: the endpoint to access the API's server address + action=query to get information + list=search to find matching pages + srlimit=15 to return a maximum of 15 matching pages + srsearch=inputText to search for page titles/content matching the value specified by the user + format=json to receive data in JSON format + prop=revisions to get the most recent page revision + origin=* for non-authenticated requests
  var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=15&srsearch=" + inputText  + "&format=json&prop=revisions&origin=*";

  // The open method configures the request: GET is a method to retrieve information from the server + the endpoint (the server address where the data is stored) + true for an asynchronous request - the browser will take care of the request in the background while other programs continue running (false would indicate a synchronous request)
  req.open("GET", url, true);
  // Headers - Additional information the client or server may need to process the request
  req.setRequestHeader("Api-User-Agent", "example/1.0");
  // For asynchronous requests, the event listener will notify us when the requested data is available
  req.addEventListener("load", function(response) {
      response = JSON.parse(req.responseText);
      console.log(response);
      // Loop over the response to gather specific data
      for(title in response.query.search) {

          var titles = response.query.search[title].title;
          var snippets = response.query.search[title].snippet;

          // Add specific data to the DOM
          var div = document.createElement("div");
          div.innerHTML = '<a href="https://en.wikipedia.org/wiki/' + titles + '" target="_blank">' + '<h2 class="h2-results">' + titles + '</h2>' + '<p>' + snippets + ' . . .</p>' + '</a>';
          resultsDiv.appendChild(div);
          div.classList.toggle("div-results");
      }
    });
    // The send method sends the request
    req.send();
  };

// Invoke searchWikipedia function when the #search-button is clicked
document.getElementById("search-button").onclick = searchWikipedia;

// Invoke searchWikipedia function when the enter key is released
document.addEventListener("keyup", function(event) {
  // The enter key is code 13
  if(event.keyCode === 13) {
    searchWikipedia();
  }
});
