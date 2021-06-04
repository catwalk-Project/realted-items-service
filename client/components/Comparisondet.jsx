import React from "react"


export default class Comparisondet extends React.Component {
    constructor(props) {
      super(props)
      this.state={
          view : ""
      }
    }


    render(){
        
       
        return (<div className="grid grid-cols-6 gap-5" >
        <div>{this.props.viewed}</div>
        <div></div>
        <div> {this.props.all}</div>
        <div></div>
        <div></div>
        <div>{this.props.related}</div>
        </div>)
    
   }
    }