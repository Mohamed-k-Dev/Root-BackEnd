// / http in nodejs ?
// + http is a built-in module in nodejs that allows you to create a web server and handle HTTP requests and responses. it provides a set of methods and properties that can be used to create a server, listen for incoming requests, and send responses back to the client.

// * createServer in nodejs ?
// ? it is a method that creates a new HTTP server and returns an HTTPServer object that can be used to handle incoming requests and send responses back to the client.
// ? http.createServer((req  , res => {}));
// ? createServer is a function that takes a callback function as an argument. The callback function takes two arguments: req and res.
// ? The req argument is an object that contains information about the incoming request, such as the URL, headers, and body. The res argument is an object that can be used to send a response back to the client.

// * listen in nodejs ?
// ? it is a method that starts the server and listens for incoming requests on the specified port.
// ? listen takes a port number , hostname , backlog and a callback function as an argument .
// ? server.listen(PORT, (err) => {});
// ? server.on('error', (err) => {});

// - res.write() vs res.end() in nodejs ?
// _ res.write() is a method that is used to write data to the response stream. it can be called multiple times to write multiple chunks of data to the response.
// _ res.end() is a method that is used to end the response stream and send the response back to the client. it can only be called once and should be called after all the data has been written to the response stream using res.write().

// * res.writeHead(statusCode, statusMessage , { headers}) in nodejs ?
// ? res.writeHead() is a method that is used to set the status code, status message, and headers for the response. it takes three arguments: statusCode, statusMessage, and headers.
// ? res.writeHead(200, "done", { "Content-Type": "application/json" });

// * http status code in nodejs ?
// ? http status code is a three-digit code that is returned by the server in response to an HTTP request. it indicates the status of the request and whether it was successful or not. some common http status codes include:
// ? 200 - OK
// ? 404 - Not Found
// ? 500 - Internal Server Error

// * req in nodejs ?
// ? req is an object that contains information about the incoming request, such as the URL, headers, and body. it is passed as an argument to the callback function that is used to create the server using http.createServer() method.