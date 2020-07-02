## This is assignment 7 of IITkbucks.


### Usage

Type the following command in terminal to run this code 
```Javascript
node main.js
```

### Objective 

* Implement nonceFinder function using worker ( creating a separate thread)

### Benefits

By running the nonceFinder function separate from the main thread , Server is still able to accept REST API calls 
Otherwise the main thread will be blocked and you'll not be able to receive any requests.
