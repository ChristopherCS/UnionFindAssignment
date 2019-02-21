# Union Find Example
**CS4310 Assignment 3**
**By Chris Carlson**

This is an example of the union find algorithm using a tree based implementation, (but without the path compression heuristic). It was written for CS4310, Analysis of Algorithms.

It takes as input a file with the following format: 
> The file starts with a line of two integers N and M (1<=N, M<=1000). N indicates the number of friends; the friends are marked from 1 to N. Then M lines follow. Each line consists of two integers A and B (A != B), that means friend A and friend B know each other.

```
Sample Input:
5 3
1 2
2 3
4 5
```

It outputs the number of disjoint sets in the data.

```
Sample Output (Given the input data above):
 2
```
## How to Run 
This program requires node.js to be installed in order to run. If you do not have node installed, downloads	are available [at the node website](https://nodejs.org/en/download/). If it's more convenient, instructions for installing node via your system's package manager can be found [here](https://nodejs.org/en/download/package-manager/).

Once node is installed, the program can be run from the command line with the command: `$ node C_Carlson_Assignment3.js inputFileName`

It is important that the name of the input file is passed as an argument when calling the program, or the program will not run. Also, ensure the input file is formatted according to the specifications shown above, or the program will not function properly.

**Visit the project's repository on github at [https://github.com/ChristopherCS/UnionFindAssignment](https://github.com/ChristopherCS/UnionFindAssignment).** 

#### License MIT
