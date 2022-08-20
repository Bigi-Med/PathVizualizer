import { gridSize } from "../PathViz";



var visitedVert = [];

let Vertice = {
    row: 0,
    colomn : 0,
    prev: 0,
}

export function dijkstra(startNode, finishNode, nodes)
{
    let returnParam = {
        visitedNodes: [],
        path : []
    }
    let path = [];
    let visitedNodes = [];
    let neighbors = [];
    const computing = []; //containes vertices in process of distance calculation
    nodes[startNode.x][startNode.y].distance = 0; //setting start vertice distance to 0
    nodes[startNode.x][startNode.y].visited = true; //marking start vertice as visited
    nodes[startNode.x][startNode.y].prev = 0;
    nodes[startNode.x][startNode.y].done = false;
    nodes[startNode.x][startNode.y].prevSet = true;
    Vertice.row = startNode.x;
    Vertice.colomn = startNode.y;
    // Vertice.prev = null;

    visitedVert.push(Vertice);
    
    
    for(let row = 0; row<gridSize.row; row++)
    {
        for(let colomns = 0; colomns<gridSize.colomns; colomns++)
        if(row != startNode.x || colomns != startNode.y)
        {
            nodes[row][colomns].distance = Infinity; //setting starting distance of rest of vertices to infinity
            nodes[row][colomns].visited = false; //marking rest of vertices as unvisited
            nodes[row][colomns].prev = [];
            nodes[row][colomns].done = false;// already done a search from it
            nodes[row][colomns].prevSet = false;//prev vertice not yet set
        }
    }
    while(nodes[finishNode.x][finishNode.y].visited === false)
    {

        //calculating the distances
        for(let row = 0; row<gridSize.row; row++)
        {
        for(let colomns = 0; colomns<gridSize.colomns; colomns++)
        {
            if(nodes[row][colomns].visited === true && nodes[row][colomns].done === false) //start from the visited vertices
            {
                let currentNode = {
                    x : row,
                    y : colomns,
                };
                neighbors = getNeighbors(nodes,currentNode);
                // console.log(neighbors);
                for(let ney = 0 ; ney<neighbors.length;ney++)
                {
                    computing.push(neighbors[ney]);
                    try{
                        if(nodes[neighbors[ney][0]][neighbors[ney][1]].done === true)
                        {
                            continue;
                        }
                        nodes[neighbors[ney][0]][neighbors[ney][1]].distance = Math.min(nodes[currentNode.x][currentNode.y].distance +1,nodes[neighbors[ney][0]][neighbors[ney][1]].distance);
                        visitedNodes.push([neighbors[ney][0],neighbors[ney][1]])
                        if(nodes[currentNode.x][currentNode.y].distance +1 >= nodes[neighbors[ney][0]][neighbors[ney][1]].distance && !nodes[neighbors[ney][0]][neighbors[ney][1]].prevSet )
                        {
                            nodes[neighbors[ney][0]][neighbors[ney][1]].prev = [row,colomns]; 
                            nodes[neighbors[ney][0]][neighbors[ney][1]].prevSet = true;

                        }
                        // console.log(neighbors[ney]);
                        // console.log(nodes[neighbors[ney][0]][neighbors[ney][1]])
                    }catch(Exception)
                    {
                        continue;
                    }
                    //from the source vertice, calculate the minimum distance
                }
                nodes[row][colomns].done = true; //this node has visited all of his neighbors, we will no longer compute from it
            }
        }
    }

    //set visited nodes to true, after all calculations are done.
    for(let comp = 0; comp<computing.length; comp++)
    {
        for(let row = 0; row<gridSize.row; row++)
        {
            for(let colomn = 0; colomn<gridSize.colomns; colomn++)
            {
                try{
                    nodes[computing[comp][0]][computing[comp][1]].visited = true; 
                }
                catch(Exception)
                {
                    continue;
                }
            }
        }
    }
}

    let previous = [];

    while(previous[0] != startNode.x && previous[1] != startNode.y)
    {
        for(let row = 0; row <gridSize.row; row++)
        {
            for (let colomn = 0 ; colomn<gridSize.colomns; colomn++)
            {
                if(row == finishNode.x && colomn == finishNode.y)
                {
                    console.log(nodes[row][colomn].prev);
                    path.unshift(nodes[row][colomn].prev);
                    previous = nodes[row][colomn].prev;
                    break;
                }
            }
        }
        finishNode.x = previous[0];
        finishNode.y = previous[1];
    }
    returnParam.path = path;
    returnParam.visitedNodes = visitedNodes;
    return returnParam;
}




 function getNeighbors(nodes, currentNode)
{
   const neighbors = []

    neighbors.push([currentNode.x,currentNode.y+1]);
    neighbors.push([currentNode.x,currentNode.y-1]);
    neighbors.push([currentNode.x-1,currentNode.y]);
    neighbors.push([currentNode.x-1,currentNode.y-1]);
    neighbors.push([currentNode.x-1,currentNode.y+1]);
    neighbors.push([currentNode.x+1,currentNode.y]);
    neighbors.push([currentNode.x+1,currentNode.y+1]);
    neighbors.push([currentNode.x+1,currentNode.y-1]);

    //edge cases will be resolved later with try catch block

    return neighbors;
}

