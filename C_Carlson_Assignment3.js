let fs = require('fs');

let fileName = getFileName();

processFile(fileName, processData);

function processData(dataArray){
	let nFriends = 0;
	let nRelations = 0;
	let friendsArray = {};
	for(let i in dataArray){
		if(i == 0){
			let vals = dataArray[0].split(' ');
			nFriends = vals[0];
			nRelations = vals[1];
			friendsArray = makeSet(nFriends);
			console.log(`Number friends = ${nFriends}\nNumber Relations = ${nRelations}\n`);
		}
		else{
			let vals = dataArray[i].split(' ');
			let frA = vals[0] - 1;
			let frB = vals[1] - 1;
			if(!find(frA, frB, friendsArray)){
				union(frA, frB, friendsArray);
			}
		}
	}
	console.log(countSets(friendsArray));
}

function union(friendA, friendB, fArray){
	fArray[friendA].parent = friendB;
}

function find(friendA, friendB, fArray){
	let l1 = fArray[friendA];
	let l2 = fArray[friendB];
	let found = false;

	while(l1.parent != l1.self && !found){
		if(l1.parent == l2.self){
			found = true;
		}else{
			l1 = fArray[l1.parent];
		}
	}
	l1 = fArray[friendA];	
	while(l2.parent != l2.self && !found){
		if(l2.parent == l1.self){
			found = true;
		}else{
			l2 = fArray[l2.parent];
		}
	}
	return(found);
}

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

function countSets(friendsArray){
	let nSets = friendsArray.length;
	for(let i in friendsArray){
		if(friendsArray[i].self != friendsArray[i].parent){
			nSets--;
		}
	}
	return(nSets);
}

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

function getFileName(){
	if(process.argv.length == 3){
		return process.argv[2];
	}else{
		console.error(`No input file specified. \nPlease Enter the name of the input data file as a command line argument, ex:\nnode C_Carlson_Assignment3.js input_filename\n`);
		process.exit(1);
	}
}

