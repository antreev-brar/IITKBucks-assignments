## Assignment 6

There are two files :

 *  server.js : Main server (port :**3000**)
 *  test_server.js :dummy used for testing  (port :**8000**)
 
To run the code 
```
node server.js
```
To generate url using ngrok 
```
ngrok http <port_number>
```

Server has two end points :
* /list -  GET request
* /add  -  POST request

ADD url of peers in **peers[]**

To make a post request
```
http --json http://path.to.url/add key:=123456 value="rick and morty"
```

To make a get request 
```
http --json http://path.to.url/list
```
