//core Module, tambien se usa el fs

let http = require("http");
//localmodule

//let log = require("./modules/mylog");
let { info, error } = require("./modules/mylog");
let url = require("url");
let querystring = require("querystring");

let { countries } = require("countries-list");

let server = http.createServer(function(request, response) {
  let parsed = url.parse(request.url);
  console.log("parsed:", parsed);

  let pathname = parsed.pathname;
  let query = querystring.parse(parsed.query);
  console.log("query:", query);

  if (pathname === "/") {
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("<html><body><p>Home Page</p></body></html");
    response.end();
  } else if (pathname === "/exit") {
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("<html><body><p>Bye</p></body></html");
    response.end();
  } else if (pathname === "/country") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname === "/info") {
    let resul = info(request.url);
    response.writeHead(200, { "Content-type": "text/html" });
    response.write(resul);
    response.end();
  } else if (pathname === "/error") {
    let resul = error(request.url);
    response.writeHead(200, { "Content-type": "text/html" });
    response.write(resul);
    response.end();
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.write("<html><body><p>Not Found</p></body></html");
    response.end();
  }
});
server.listen(4000);
console.log("runnig on 4000");
