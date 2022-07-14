import React , {Component} from 'react';
import './Node.css';
export default class Node extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isToggled : false,
        }
    }

    toggleNode(){
       this.setState({
            isToggled : !this.state.isToggled,
        })

    }

    render ()
    {
        const nameClass = this.state.isToggled ? 'on' : 'off';
        
        return (
            <div className = {nameClass} id = "node" onClick={()=>this.toggleNode()}></div>
        );
    }
}

