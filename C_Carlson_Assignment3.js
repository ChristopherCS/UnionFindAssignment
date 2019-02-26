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
			if(find(frA, friendsArray) !== find(frB, friendsArray)){
				union(frA, frB, friendsArray);
			}
		}
	}
	// Finally, log the result of the countSets function
	console.log(countSets(friendsArray));
}

// Here we traverse to the root of the tree for one of the friends and
// during the traversal, we point all the members of the tree to friend B
// as a new root. This should effectively compress the path, as we traverse it.
function union(friendA, friendB, fArray){
	let temp = friendA;
	do{
		let parent = fArray[temp];
		fArray[temp] = friendB;
		 temp = parent;
	}while(temp !== fArray[temp]);
}


// Find the root of the tree the friend is a part of
// and return the identifier of this root node.
function find(friend, fArray){
	while(friend !== fArray[friend]){
		friend = fArray[friend];
	}
	return(friend);
}


// Build the sets. Initially each member is its own tree root.
function makeSet(numberOfSets){
	let i = 0;
	let storageArray = {};
	for(i; i<numberOfSets; i++){
		storageArray[i] = i;
	}
	return storageArray;
}

// A function to count the number of disjoint sets. 
// It iterates through all the members of the array, looking for tree roots. However many roots there are, that is how many disjoint sets there are.
function countSets(friendsArray){
	let nSets = 0;
	for(let i in friendsArray){
		if(i == friendsArray[i]){
			nSets++;
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
