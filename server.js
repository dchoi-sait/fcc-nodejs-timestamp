// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();




// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api", (req, res) => {
  var date = req.params.date;
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})


app.get("/api/:date", (req, res) => {
  var date = req.params.date;
 

  //If date is not unix, convert to unix time.
  if (date.includes('-') || date.includes(' ')) {
    date = new Date(date).getTime();
  }

  date = parseInt(date);

  if (new Date(date).toUTCString() == "Invalid Date") {
    res.json(
      {
        error: "Invalid Date"
      }
    );
    return;
  }

  res.json(
    {
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString()
    }
  );
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
