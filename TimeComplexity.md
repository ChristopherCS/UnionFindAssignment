# Time Complexity Analysis
The run time analysis of this program is logically divided into three parts: initialization, set building, and finalization. I will address each of these portions separately, and then I will summarize the overall runtime at the end.

## Initialization
The initialization code has one major step, adn this is initializing the singleton sets based on the number of friends reported on line one of the file. 

Initializing the singleton steps runs exactly n times, where n is the number of friends given (each being a part of the network). First two variables are initialized, a counter and an array, (which is returned at the end of the makeSet function). Then, for each friend, the corresponding location in the array is initialized to hold two values: "self" and "parent". It is technically redundant to store the value "self". 