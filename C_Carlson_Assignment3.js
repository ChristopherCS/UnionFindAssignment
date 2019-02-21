let fs = require('fs');




let processFile = function(filename, dataHandlerFunction){
	fs.readFile(filename, cb(err, data){
		if(err){
			console.error(`Error Processing File ${filename}.\nError: ${err}`);
		}else{
			let dataArray = data.toString();
		}
	});
}

let getFileName = function(){
	return process.argv[2];
}