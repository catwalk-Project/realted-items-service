import React from 'react'
import Details from "./Details.jsx"

export default class Moredetails extends React.Component {
    constructor(props) {
      super(props)
    this.state={
        view : ""
    }
    
    
    }


render(){
    if(this.state.view==="details"){
        return <Details data={this.props.data} />
    }
    return (
        <div>
<div className="w-48 border-black border m-10" onClick={()=>this.setState({view : "details"})}>
        <div className=" w-40 m-3 mt-70">
          <p className="font-bold">desciption : {this.props.data.description}</p>
          <p className="font-bold">slogan :  {this.props.data.description}</p>
        
          </div>
          </div>
      </div>

    )
}


}