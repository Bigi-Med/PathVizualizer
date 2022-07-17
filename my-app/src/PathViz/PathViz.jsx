import React , {Component} from  'react';
import Node from './Node/Node.jsx';
import './PathViz.css';

var gridSize = {
    colomns: 40,
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
        };
    }

    CreateGrid () {
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
            console.log("in cond");
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
    
    render()
    {
        const {node} = this.state;
        const mouse = this.state.mouseDown ? "down" : "up";
        const upAfterDown = this.state.mouseUpafterDown ? "yes" : "no";
       

        return (
            <div onMouseDown={this.toggleMouse.bind(this)} onMouseUp={this.toggleMouse.bind(this)}  className="grid" >
               {this.CreateGrid()}
           {node.map((row,rowidx) => {
            return <div key={rowidx}> {row.map((node,nodeidx) => <Node key={nodeidx} mouse = {mouse} upAfterDown = {upAfterDown}></Node>)}
            </div>
           })}
           </div>
        );
    }
}

export default PathViz