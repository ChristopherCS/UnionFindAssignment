// C_Carlson_Assignment3.js
// By: Chris Carlson
// Date: Feb 21, 2019
// Description: See Readme


let fs = require('fs');

// Get the File Name.
let fileName = getFileName();

// The readfile call is asynchronous. The processData function is called as a callback for the readFile function. The actual data processing happens in the processData function.
processFile(fileName, processData);


// Begin processing the data.
function processData(dataArray){
	let nFriends = 0;
	let nRelations = 0;
	let friendsArray = {};
	for(let i in dataArray){
		// First iteration, get the number of friends in the array and the number of relations to process.
		if(i == 0){
			let vals = dataArray[0].split(' ');
			nFriends = vals[0];
			nRelations = vals[1];
			friendsArray = makeSet(nFriends);
		}// Now start processing the relations.
		else{
			let vals = dataArray[i].split(' ');
			// Since the friends "IDs" start at 1, but the arrays start at zero, subtract 1 from the ID's.
			let frA = vals[0] - 1;
			let frB = vals[1] - 1;
			// If no relationship exists, union the two friends.
			if(!find(frA, frB, friendsArray)){
				union(frA, frB, friendsArray);
			}
		}
	}
	// Finally, log the result of the countSets function
	console.log(countSets(friendsArray));
}

// Really simple. Point one friends "parent" to the other friend.
function union(friendA, friendB, fArray){
	fArray[friendA].parent = friendB;
}


// Here see if a relationship exists by traversing each 
// friend's tree, looking for the other friend.
function find(friendA, friendB, fArray){
	let l1 = fArray[friendA];
	let l2 = fArray[friendB];
	let found = false;

// As long as we haven't encountered the root...
	while(l1.parent != l1.self && !found){
		if(l1.parent == l2.self){
			found = true;
		}else{
			l1 = fArray[l1.parent];
		}
	}
	// Need to reset l1 to its original position.
	l1 = fArray[friendA];	
	// Now traverse the tree of the other friend.
	while(l2.parent != l2.self && !found){
		if(l2.parent == l1.self){
			found = true;
		}else{
			l2 = fArray[l2.parent];
		}
	}
	return(found);
}


// Build the sets. Initially each member is its own tree root.
function makeSet(numberOfSets){
	let i = 0;
	let storageArray = {};
	for(i; i<numberOfSets; i++){
		storageArray[i] = {
			"self":i,
			"parent":i
		};
	}
	return storageArray;
}

// A function to count the number of disjoint sets. 
// It iterates through all the members of the array, looking for tree roots. However many roots there are, that is how many disjoint sets there are.
function countSets(friendsArray){
	let nSets = Object.keys(friendsArray).length;
	for(let i in friendsArray){
		if(friendsArray[i].self != friendsArray[i].parent){
			nSets--;
		}
	}
	return(nSets);
}


// This function reads the file and passes the data, as an array separated by new lines, to the dataHandler function
function processFile(filename, dataHandlerFunction){
	fs.readFile(filename, function(err, data){
		if(err){
			console.error(`Error Processing File ${filename}.\nError: ${err}`);
			process.exit(1);
		}else{
			let dataArray = data.toString().replace(/\r\n/g, '\n').split('\n');
			dataHandlerFunction(dataArray);
		}
	});
}


// Simple function to get the input file name, or call an 
// error if none was provided.
function getFileName(){
	if(process.argv.length == 3){
		return process.argv[2];
	}else{
		console.error(`No input file specified. \nPlease Enter the name of the input data file as a command line argument, ex:\nnode C_Carlson_Assignment3.js input_filename\n`);
		process.exit(1);
	}
}



// Licence MIT
