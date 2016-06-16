// For full documentation please visit: https://github.com/mcollina/node-coap
var coap    = require('coap') 
    , server  = coap.createServer()

var payload = {
  "time": "19:04",
  "date": "16-7-2016",
  "place": "Malmoe, Sweden",
  "info": "This server is running on a Raspberry Pi from Malmoe, Sweden."+ 
          "It is part of an open source-project initiated by two programing-students named Alexander Cincarevic and Granit Demiraj. "+
          "Feel free to change the values of this object with a PUT-request. "
}

server.on('request', function(req, res) {
  console.log(req.method)
  if(req.method == "POST") {
    res.end("The raz has razieved the message")
  
  }else if(req.method == "PUT"){
    console.log(req.payload)    

    res.write("Method for changing info."+ 
              "\nFirst you write one of 4 properties, (our object has time, date, place and info.)" + 
              "\nfollowed by a comma, thereafter your new value."+
              "\nExample: \ntime,15:55 \nplace,Toronto,Canada \ninfo,This server is now hijacked by hackerz");
    res.end();
  
  }else if (req.headers['Observe'] == 0) { 
    var interval = setInterval(function() {
      res.write("This is an example of observation of server."+"\n"+"As soon as the payload changes, the server automaticlly sends a new version of payload."+ "\n" + new Date().toISOString());
    }, 1000)

    res.on('finish', function(err) {
      clearInterval(interval)
    })
  
  }else {
    res.write(JSON.stringify(payload));
    res.end();
  }
})

server.listen(function() {
  console.log('server started')
})


// For full documentation please visit: https://github.com/mcollina/node-coap