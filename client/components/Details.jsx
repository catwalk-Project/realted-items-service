import React from 'react'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
import Moredetails from './Moredetails.jsx'
import Compare from "./Compare.jsx"
export default class Details extends React.Component {
    constructor(props) {
      super(props)
  this.state={
      rating : 0,
      url : "",
      view : ""
  }
     
    }
    componentDidMount(){
      axios.get(`/rating/${this.props.data.id}`)
    .then((response)=>{
     let ratings=response.data.ratings
    let som=0
    let somval=0
    let ave
    
    for(var keys in ratings){
     
    som=som+(Number(keys)*Number(ratings[keys]))
    somval=somval+Number(ratings[keys])
    }
  
    ave=som/somval

this.setState({rating : ave})

})
    .catch((error)=>
    console.log(error)
    )

    axios.get(`/image/${this.props.data.id}`)
    .then((response)=>
    this.setState({url : response.data})
    )
    .catch((error)=>
    console.log(error)
    )
    
    }
render(){
    if(this.state.view === "moredetails"){
       return  <Moredetails data={this.props.data} />
    }
    else if(this.state.view === "compare"){
        return <Compare data={this.props.data}/>
    }
    else{
    return (
        
    <div className="flex w-1/4">
        <div className="w-48 border-black border m-10">
         <button onClick={()=>{this.setState({view : "compare"})}}><AiFillStar color="black" /></button>
        <img className="w-48 h-48 object-cover shadow-lg" onClick={()=>this.setState({view : "moredetails"})} src={this.state.url}/>
        <div className="w-40 m-3 mt-70">
          <p className="text-xs">{this.props.data.name}</p>
          <p className="font-bold">   {this.props.data.category}</p>
          <p className="font-bold">{this.props.data.default_price}$</p>
        <p className="flex ">{ [...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
            <AiFillStar color={ratingValue > this.state.rating ? 'grey' : 'black'} />
        );
    }) }</p>
    
                    </div>
                   </div>
               


            </div>
        // </div>
        // </div>

         );
}
}
  
};


