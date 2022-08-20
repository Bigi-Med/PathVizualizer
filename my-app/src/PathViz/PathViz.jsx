import React , {Component} from  'react';
import Node from './Node/Node.jsx';
import './PathViz.css';
import {dijkstra} from './algos/djikstra'

export var gridSize = {
    colomns: 15,
    row: 15
};

// var node = [];
class PathViz extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            node: [],
            alreadySet: false,
            mouseDown : false,
            mouseUp : true,
            trackDown: false,
            trackUp : false,
            mouseUpafterDown:false,
            nodesInPath : [],
        };
    }

    componentDidMount() {
        const nodes = [];

        for( let rows = 0; rows <gridSize.row; rows++)
        {
            const Row = [];
            for( let colomns = 0; colomns<gridSize.colomns; colomns++ )
            {
                Row.push([]);
            }
            nodes.push(Row)
        }
        // console.log(node);
        if(!this.state.alreadySet)
        {
            this.setState({
                node: nodes,
                alreadySet : true,
            })

        }

    }

    

    toggleMouseDown(){
        this.setState({
            mouseDown : !this.state.mouseDown,
           trackDown : true, 
            
        })
    }

    toggleMouseUp(){
        this.setState({
            mouseUp : !this.state.mouseUp,
        })
        if(this.state.trackDown === true)
        {
            this.setState({
                trackDown: false,
                mouseUpafterDown: true,
            })
        }
    }    

    toggleMouse(event){
        
        if(event.type === "mousedown")
        {
            this.setState({
                mouseDown : true,
                mouseUp : false,
               trackDown : true, 
                
            })
        }
        else{
            this.setState({
                mouseUp : true,
                mouseDown: false,
            })
            if(this.state.trackDown === true)
            {
                this.setState({
                    trackDown: false,
                    mouseUpafterDown: true,
                })
            }
        }
    }

    launchDijikstra()
    {

        let currentNode ={
            x : 3,
            y : 2,
        }

        let endNode={
            x : 13,
            y : 12,
        }

        const {node} = this.state
        const returnParam = dijkstra(currentNode, endNode ,node);

         this.animateSearch(returnParam);
        
        
    }
    
     animateSearch(returnParam)
    {
        console.log(returnParam.visitedNodes);
        returnParam.visitedNodes.pop();
        returnParam.visitedNodes.pop();
        console.log(returnParam.visitedNodes);

        returnParam.path.shift();
        for(let i = 0; i <returnParam.visitedNodes.length; i++)
        {   
            setTimeout(()=>
            {
                const node = returnParam.visitedNodes[i];
                
                document.getElementById(`node-${node[0]}-${node[1]}`).className= 'node node-in-search';
            },9*i)

            if(i === returnParam.visitedNodes.length-1)
            {
                setTimeout(()=>{
                    this.animatePath(returnParam.path)},10*i

                )
                
                
            }
        }  
        
        
    }

    animatePath(path)
    {
        for(let i = 0; i <path.length; i++)
        {
            setTimeout(()=>
            {
                const node = path[i];
        
                document.getElementById(`node-${node[0]}-${node[1]}`).className= 'node node-in-path';
            },50*i)
        }   

    }

    
    render()
    {
        const {node} = this.state;
        const mouse = this.state.mouseDown ? "down" : "up";
        const upAfterDown = this.state.mouseUpafterDown ? "yes" : "no";
       

        return (
            <>
            <button onClick={() => this.launchDijikstra()}>Dijikstra</button>
            <div onMouseDown={this.toggleMouse.bind(this)} onMouseUp={this.toggleMouse.bind(this)}  className="grid" >
           {node.map((row,rowidx) => {
            return <div key={rowidx}> {row.map((node,nodeidx) => <Node key={nodeidx} mouse = {mouse} upAfterDown = {upAfterDown} start={rowidx===3&&nodeidx===2 ? "yes" : "no"} end={rowidx===13&nodeidx===12 ? "yes" : "no"}
            row={rowidx} col={nodeidx} ></Node>)} 
            </div>
           })}
           </div>
           </>
        );
    }
}

export default PathViz