import React, { Component } from "react";

export class PokeDex extends Component {

  state = {
    pokemonSelect: null
  }

  constructor(props) {
    console.log("-- PokeDex init --");
    super(props);
    this.state = {
      pokemonSelect: this.props.pokemonSelect,
    };
  }

  //sync with parent
  componentDidUpdate(prevProps) {
    if(prevProps.pokemonSelect !== this.props.pokemonSelect) {
      this.setState({
        pokemonSelect: this.props.pokemonSelect,
      });
    }
  }

  render() {

    //some pokemons doesnt have images
    let avatarImg = <img className="mx-auto d-block" alt="avatar" src={window.location.origin + '/no-image.png'}></img>;
    if(this.state.pokemonSelect && this.state.pokemonSelect.sprites.front_default){
      avatarImg = <img className="mx-auto d-block" alt="avatar" src={this.state.pokemonSelect.sprites.front_default}></img>
    }

    return (
          <div className="col-sm-4">
          {this.state.pokemonSelect!=null?
            <div className="card">
                <h4 className="card-header">{this.state.pokemonSelect.name}</h4>
                <div className="card-body"> 
                  {avatarImg}
                  <p className="card-text text-center">id: {this.state.pokemonSelect.id}</p>
                  <p className="card-text text-center">weight: {this.state.pokemonSelect.weight}</p>
                  <p className="card-text text-center">height: {this.state.pokemonSelect.height}</p>
                </div>
            </div>
            
            :null}
          </div>

    );
  }
}

PokeDex.defaultProps = {
  pokemonSelect: null,
};

export default PokeDex;