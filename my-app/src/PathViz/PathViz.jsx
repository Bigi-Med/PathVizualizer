import React , {Component} from  'react';
import Node from './Node/Node.jsx';


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
    
    render()
    {
        const {node} = this.state;
        // console.log(this.state.node);

        return (
            <div >
               {this.CreateGrid()}
           {node.map((row,rowidx) => {
            return <div key={rowidx}> {row.map((node,nodeidx) => <Node key={nodeidx}></Node>)}
            </div>
           })}
           </div>
        );
    }
}

export default PathViz