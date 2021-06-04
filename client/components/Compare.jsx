import React from "react"
import axios from "axios"
import Comparisondet from "./Comparisondet.jsx"
import Details from "./Details.jsx"
export default class Compare extends React.Component {
    constructor(props) {
      super(props)
this.state={
    view :"",
    viewedproduct : [],
    features : ""
}
    }
    componentDidMount(){
        // var id = window.location.href.split("/")[3];
        var id=11500
        axios
          .get(`/product/${id}`)
          .then((response) => this.setState({ viewedproduct : response.data.features }))
          .catch((error) => console.log(error));
    }
    render(){
        var tab=[]
        var prodviewer=[]
        var prodrelated=[]
        var tabview=[]
        var tabrel=[]
        if(this.state.view==="details"){
            return <Details data={this.props.data} />
        }
for(var i=0;i<this.state.viewedproduct.length;i++){
    tabview.push(this.state.viewedproduct[i].feature)
    tab.push(this.state.viewedproduct[i].feature)
}
for(var j=0;j<this.props.data.features.length;j++){
    tabrel.push(this.props.data.features[j].feature)
    tab.push(this.props.data.features[j].feature)
}
for(var t=0;t<tab.length;t++){
    if(tab.indexOf(tab[t],t+1)>=0){
        tab.splice(y,1)
    }
}

for(var y=0;y<tab.length;y++){
  if(tabview.indexOf(tab[y])>=0){
      prodviewer.push("yes")
  }
  else if(tabview.indexOf(tab[y])===-1){
    prodviewer.push("no")
  }
  if(tabrel.indexOf(tab[y])>=0){
   prodrelated.push("yes") 
}
else if(tabrel.indexOf(tab[y])===-1){
    prodrelated.push("no") 
}
}

        return (
<div>
  
   
    <div className="w-48 border-black border m-10" onClick={()=>this.setState({view : "details"})}>
       
        <div className=" w-40 m-3 mt-70">
            <div className="grid grid-cols-3 gap-1">
       <div>viewed</div>
       <div>charac</div>
       <div>related</div>
       </div>
    {tab.map((element,key)=>{
   return <Comparisondet data={this.props.data} all={element} viewed={prodviewer[key]} related={prodrelated[key]}/>
     })} 

        
        
          </div>
          </div>

</div>


        )
    }
}