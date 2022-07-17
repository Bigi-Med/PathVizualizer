import React , {Component} from 'react';
import './Node.css';



var nameClass = "off";
export default class Node extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            mouseDown : false,
            mouseUp: true,
            isHover : false,
            isVisited: false,
        }
    }

    togglemouse(){
       this.setState({
            mouseUp : !this.state.mouseUp,
            mouseDown : !this.state.mouseDown,
        });
    }

       

        toggleEnter(){
            this.setState({
                isHover : true,
            })
            if(this.props.mouse === "down")
            {
                this.setState({
                    isVisited: true,
                })
            }
        }
        toggleLeave(){
            if(this.props.mouse === "up")
            {
                this.setState({
                    isHover: false,
                });
            }
        }

    

    render ()
    {
        //  nameClass = this.state.isHover && this.props.mouse === "down"   ? 'on' : 'off';
         if (this.state.isHover && this.props.mouse === "down")
         {
            nameClass = "on";
            
         }
         else if (this.props.mouse === "up" && this.state.isVisited === true)
         {
            nameClass = "on";
         }
         else{
            nameClass = "off";
         }
         
        return (
            <div className = {nameClass} id = "node" onMouseLeave={()=>this.toggleLeave()} onMouseEnter = {()=>this.toggleEnter()}></div>
        );
    }
}

