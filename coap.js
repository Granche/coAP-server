// For full documentation please visit: https://github.com/mcollina/node-coap

var coap    = require('coap') 
    , server  = coap.createServer();

var payload = "Welcome! \n"+
              "This server is put together and held by Aleksandar Cincarevic and Granit Demiraj, two programing students from Malmoe, Sweden. \n"+
              "Its purpose is so far strictly for training on coAP-requests, it is sitting somewhere in Malmoe, in a Raspberry Pi, and your welcome to use it.\n\n"+
              "This is how it works:\n"+
              "You obviously already made a GET-request if you can read this,\n"+
              "Send a POST-request and your payload will attach to this message.\n"+
              "To change this message, send PUT-request with your new value\n"+
              "You can OBSERVE this server, so far we have just an example with a clock.\n"+
              "\n\n"+
              "If you have any questions or suggestions, please don't hesitate to contact us at: Granit.demiraj@hotmail.com\n"+
              "Shot out to Matteo Mcollina for the coap-library!\n";

server.on('request', function(req, res) {

  if(req.method == "POST") {
    payload += "\n"+req.payload;
    res.end(payload)

  }else if(req.method == "PUT"){
    payload = req.payload;
    res.end(payload);
  
  }else if (req.headers['Observe'] == 0) { 
    var interval = setInterval(function() {
      res.write("This is an example of observation of server."+"\n"+"As soon as the payload changes, the server automaticlly sends a new version of payload."+ "\n" + new Date().toISOString());
    }, 1000)

    res.on('finish', function(err) {
      clearInterval(interval)
    })
  
  }else {
    res.write(payload);
    res.end();
  }
})

server.listen(function() {
  console.log('server started')
})


// For full documentation please visit: https://github.com/mcollina/node-coap
