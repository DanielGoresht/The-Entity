

//This is my code for solving the Myntex Coding Test
//I tried to make it as dynamic as possiable, but I did make the assumption that all cities would have routes to eachother. 


/*
I started by using this adjacency matrix.  Each location in represented by row, and a 1 in the a 1 in row means it has a travel path to the corresponding column 
the rows corrispond to the order in which the citys were shown in the test.  For example, the first row shows which citys Rio can travel to.

*/
var travelPathGraph = [
  [0, 0, 1, 0, 1, 0, 0 ,0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0]
];


//just initialize some global variables 
  var checkedCities = [];
  var queList = [];
  var parentList = [];
  var prevParent = [null];
  var routeFound = 0; //this is the flag that ges set when a route is found
  var finalRoute = []
  var totalTravelTime = 0;


//this is the main function that is called.  It takes in the start point, where you would like to end, and what your home city is.
//the parent paramater is just there for late in the code when we call the function again.  The parent value does initially need to be called with the same value as start
function findRoute(start, end, home, parent){
  var currentList = travelPathGraph[start];
  var tempList = [];

  //first we error handle if the user is trying to teleport to their start location from their end location
  if (start == end){
  	routeFound = 1;
  	alert("you can't teleport to your same location");
  }

  //now we check if the current city has a direct flight path to our destination
  if (currentList[end] == 1){
    finalRoute = ([parent]+[end]);

    alert(finalRoute);

    findTravelTime(finalRoute, home);

    routeFound = 1;
  }
  //if it doesnt we now to to check the child nodes of our current city.  
  else {
    for (var i = 0; i < currentList.length; i++){
      if (currentList[i] == 1){
      	//for every spot we find a 1 in the row that means there is a travel path

      	//we push the index of each 1 we find into a queue.  this will tell us what rows we need to seach for our destination, and what order to search for them
        queList.push(i);

        //we also need to keep track of the parent nodes so we can remember the exact path we will have to take

        parentList.push(parent);

      }
    }
  
    //we have now created a list of cities we need to check, so we will soop though them or until we find our destination
    while (queList.length > 0 && routeFound == 0){
      
      //var j is created which is essentally the child node that we want to examine next.  I just reverse the list twice cause I want to take it from the head of the list
      queList.reverse();
      var j = queList.pop(0);
      queList.reverse();

      //the parentList is just a list that each element corrisponds to the same index of the queList.
      //it keeps track of all the previous parents of each element so that when we find our destination we also know the route
      parentList.reverse();
      prevParent = parentList.pop(0);
      parentList.reverse();




      //we now recursively call this function except passing in the child as the new parent, and the previous parents appened with the child.

      findRoute(j, end, home, [prevParent]+j);

    }


  
  }


}



//this is a simple function for totaling up the travel time it will take the user
function findTravelTime(route, home){
  totalTravelTime = 0;
  var destination;
  //route a string with digits corrisponding to each city that will traveled to.
  //we just check which cities we are going to, and for each one we are going to add 2 hours, unless that is our home city
  //in that case the time added will only be 1.
  for (i = 1; i < (route.length); i++){

  	destination = route[i]

  	totalTravelTime += 2;
  	if (destination == home){
  		totalTravelTime -= 1;
  	}




  	


  }
  
}

findRoute(1,2,8,[1]);
alert(totalTravelTime);