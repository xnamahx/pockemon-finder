import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Header } from './components/header/header';
import { ResultTable } from './components/resultTable/resultTable';
import { Footer } from './components/footer/footer';


class App extends Component {

  state = {
    searchResult: [],
    pokemonData: [],
    submited: false,
    searchText:""
  }

  componentDidMount() {
    console.log("-- App mounted --");
    this.getPokeData();
  }

  //Listen for changes in Header Search
  onSearchResult = (data) =>{
    let dataFound = [];
    if(data && data.length){
      dataFound = data;
    }
    this.setState({
      searchResult:dataFound,
      submited:true
    });
  }


  //Getting search data at load
  getPokeData = () =>{
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.state.pokemonData.length)
      .then(res => res.json())
      .then((data) => {
        this.setState({pokemonData:this.state.pokemonData.concat(data.results)});
        if(this.state.pokemonData.length < data.count){
          //iterating till reach the count of total records
          this.getPokeData();
        }
      })
      .catch(console.log);
  }

  render(){
    return (
      <div className="App">
        <Header pokemonData={this.state.pokemonData} onSearchResult={this.onSearchResult}></Header>

        <div className="container">

          <ResultTable submited={this.state.submited} pokemonData={this.state.searchResult} onSelect={this.onSelect}></ResultTable>

        </div>
        <Footer></Footer>
      </div>
    );
  }

}

export default App;
