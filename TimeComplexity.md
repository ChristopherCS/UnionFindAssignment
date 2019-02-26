# Time Complexity Analysis
The run time analysis of this program is logically divided into three parts: initialization, set building, and finalization. I will address each of these portions separately, and then I will summarize the overall runtime at the end.

## Initialization
The initialization code has one major step, adn this is initializing the singleton sets based on the number of friends reported on line one of the file. 

Initializing the singleton steps runs exactly n times, where n is the number of friends given (each being a part of the network). First two variables are initialized, a counter and an array, (which is returned at the end of the makeSet function). Then, for each friend, the corresponding value in the array is given its own value, (each node pointing to itself).

The total time for all this is approximately:
```3n+3 operations```

## Set Building
During set building the program iterates line by line through the data file. Each line being a relationship between two friends, the program searches for the set containing each friend, then compares if they are a part of the same set. It finds the set for a particular friend by traversing up the tree until it finds the root node. The index location of this root node in the friends array is returned as the "set name". 

So, supposing the input file specifies m relationships, then for every relationship there must be two calls to find, and, possibly, a call to union. 

During each call to the find operation, a while loop runs which traverses up the tree to the root, which at most will be log(n) traversals. Each traversal runs a compare and an assignment operation, so thats 2log(n) operations at most to run the find operation. Note however that during every union operation, if it is found the tree is more than a single layer deep, then the tree is compressed, so realistically, if we did an amortized analysis for example, our results would look more like what they found in Goodrich and Tammasia's amortized analysis of Union Find.  

During each call to union, we traverse up the tree for one friend, and at each point we assign a new parent node to each friend in the tree, which is the other friend we are making a union with. This compresses the tree while creating a union. This means there is a maximum of log(n) traversals taking place, and at each traversal we are doing 3 assignments and a comparison. At the beginning of the function there is also a variable declaration and at the end there is a return. So over all, the union function has approximately 4log(n)+2 operations.

Thus, during this set building stage we have a maximum of 2 find operations, (2 * 2log(n)), plus a union operations, (4log(n)+2), which results in:
```(8+m)log(n)+2 operations```

## Finalization
During the finalization stage the program runs the function, countSets one time. This function, countSets, is the weak link in the overall runtime of the program. It iterates through the entire array of friends, and counts how many friends are root nodes. The number of root nodes is, of course, the number of disjoint sets. 

So, when countSets runs there is a variable assignment and a return statement, plus for each of the n friends in there is a lookup, a test, and (possible), a variable assignment. Therefore, overall, the complexity of the finalization phase of the program is:
```3n+2 operations```

## Summary
Therefore, summing up all these things, we have a worst case complexity of:
```
  3n+3 operations 
+ (m+8)log(n)+2 operations 
+ 3n+2 operations
= 6n + (8+m)log(n) + 7 operations  

```

This is O(mlog(n)).