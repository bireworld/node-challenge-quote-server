//Load the 'express' library which makes it easier 
//to handle HTTP conversations:
const express = require("express");
const app = express();
const quotes = require("./quotes.json");
const lodash = require('lodash');
const  cors = require('cors');
//Register some handlers for different routes.
//Read about routing here:
//http://expressjs.com/en/starter/basic-routing.
//You can add more routes.




app.get("/", function(request, response) {
  response.send("Berhane's Quote Server!  Ask me for /quotes, or /quotes/random using lodash or /quotes/search?word=(put a word to search)");
});

app.get("/quotes", function(request, response) {
  response.json(quotes);
});

app.delete("/quotes/random", function(request, response) {
  response.json(lodash.sample(quotes));
});
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
app.get("/quotes/search", function(request, response) {
  let word = request.query.word;  
  response.json(findQuotesByWord(quotes,word));
});
function findQuotesByWord(quotes,word){
  return quotes.filter(quote=>{
    return quote.quote.toLowerCase().includes(word.toLowerCase())|| quote.author.toLowerCase().includes(word.toLowerCase());
  })
}



//Tell the server to start listening for requests.
//This will prevent the program from exiting.
//It will keep running, and when a matching request 
//comes in, it will call the handlers we registered above.
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
