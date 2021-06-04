import "./index.css";
import React from "react";
import axios from "axios";
import Details from "./components/Details.jsx";
export default class Relatedproduct extends React.Component {
  constructor() {
    super();

    this.state = {
     viewedproduct : [],
      data: [],
      indexstart: 0,
      indexend: 3,
      indexstarto: 0,
      indexendo:3 ,
      outfitproduct : []
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.nextoutfit = this.nextoutfit.bind(this);
    this.prevoutfit = this.prevoutfit.bind(this);
    this.outfit = this.outfit.bind(this);
  }
  saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state.outfitproduct))
  }
  outfit(){
    
    var tab=this.state.outfitproduct
    var bolean=false
 

for(let i=0;i<tab.length;i++){
if(tab[i].name===this.state.viewedproduct.name){
  bolean=true
}
}
if(bolean===false){

  tab.push(this.state.viewedproduct)
}

    
       
        this.setState({outfitproduct : tab}, this.saveStateToLocalStorage)
      
      
    
    
  }

  componentDidMount() {
    const state = localStorage.getItem('state')
    if (state) {
      this.setState({outfitproduct : JSON.parse(state)})
    }
    // var id = window.location.href.split("/")[3];
    var id=11500
    axios
    .get(`/product/${id}`)
    .then((response) => this.setState({ viewedproduct : response.data }))
    .catch((error) => console.log(error));

    axios
      .get(`/data/${id}`)
      .then((response) => this.setState({ data: response.data }))
      .catch((error) => console.log(error));
  }
  next() {
    let newindexstart = this.state.indexstart + 1;
    let newindexend = this.state.indexend + 1;
    if (this.state.indexend === this.state.data.length - 1) {
      this.setState({
        indexstart: this.state.indexstart,
        indexend: this.state.indexend,
      })
   
    } else {
      this.setState({ indexstart: newindexstart, indexend: newindexend });
    }
  }
  prev() {
    let newindexstart = this.state.indexstart - 1;
    let newindexend = this.state.indexend - 1;
    if (this.state.indexstart === 0) {
      this.setState({
        indexstart: this.state.indexstart,
        indexend: this.state.indexend,
      });
    } else {
      this.setState({ indexstart: newindexstart, indexend: newindexend });
    }
  }
  nextoutfit(){
    let newindexstart = this.state.indexstarto + 1;
    let newindexend = this.state.indexendo + 1;
    if (this.state.indexendo === this.state.outfitproduct.length - 1) {
      this.setState({
        indexstarto: this.state.indexstarto,
        indexendo: this.state.indexendo,
      })
   
    } else {
      this.setState({ indexstarto: newindexstart, indexendo: newindexend });
    }

  }
  prevoutfit(){
    let newindexstart = this.state.indexstarto - 1;
    let newindexend = this.state.indexendo - 1;
    if (this.state.indexstarto === 0) {
      this.setState({
        indexstarto: this.state.indexstarto,
        indexendo: this.state.indexendo,
      });
    } else {
      this.setState({ indexstarto: newindexstart, indexendo: newindexend });
    }

  }

  render() {  
    return (
      <div>
        <h1 className="ml-10">YOUR RELATED PRODUCT</h1>
        <div className="inline-flex space-x-4 gap-2">
          <div className="w-1/6" onClick={this.prev} >
           {this.state.data.length<4 || this.state.indexstart > 0  && <i className="fas fa-chevron-left"></i>}
          </div>
          <div className="flex flex-wrap w-full">
            {this.state.data.map((element, key) => {
              if (key >= this.state.indexstart && key <= this.state.indexend) {
                return <Details data={element} />;
              }
            })}
          </div>

          <div className="w-1/6" onClick={this.next} >
            {this.state.data.length<4 || this.state.indexend!==this.state.data.length - 1 && <i class="fas fa-chevron-right"></i>}
          </div>
        </div>
        <h1 className="ml-10">YOUR OUTFIT</h1>
        
          <div className="inline-flex space-x-4 gap-2">
          <div className="w-1/6" onClick={this.prevoutfit} >
          {this.state.outfitproduct.length<4 ||this.state.indexstarto > 0 && <i className="fas fa-chevron-left "></i>}
          </div>
          <button  className="w-1/6" onClick={this.outfit}><i class="fas fa-plus-circle"></i></button>
          <div className="flex flex-wrap w-full">
          
    {this.state.outfitproduct.map((element, key) => {
              if (key >= this.state.indexstarto && key <= this.state.indexendo) {
                return <Details data={element} />;
              }
            })}
            </div>
            
            <div className="w-1/6" onClick={this.nextoutfit} >
            {this.state.outfitproduct.length<4 || this.state.indexendo !==this.state.outfitproduct.length - 1 && <i class="fas fa-chevron-right"></i>}
          </div>
          </div>
          </div>
     
    );
  }
}
