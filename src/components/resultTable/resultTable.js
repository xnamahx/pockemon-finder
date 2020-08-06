import React, { Component } from "react";
import {Table} from 'react-bootstrap';

import { PokeDex } from '../../components/pokeDex/pokeDex';

export class ResultTable extends Component {

  state = {
    submited: false,
    pokemonData: [],
  }

  constructor(props) {
    console.log("-- ResultTable init --");
    super(props);
    this.state = {
      onSelect: this.props.onSelect,
      pokemonData: this.props.pokemonData,
    };
  }

  //Click event "select"
  doSelectResult = (selection) =>{
    fetch('https://pokeapi.co/api/v2/pokemon/' + selection)
      .then(res => res.json())
      .then((data) => {
        this.setState({pokemonSelect:data});
      })
      .catch(console.log);
  }

  //sync with parent
  componentDidUpdate(prevProps) {
    if(prevProps.pokemonData !== this.props.pokemonData) {
      this.setState({
        pokemonData: this.props.pokemonData,
      });
    }
    if(prevProps.submited !== this.props.submited) {
      this.setState({
        submited: this.props.submited
      });
    }
  }

  render() {

    //iterate data and create elements to show pokemon table
    const showItems = this.state.pokemonData.map((value, index) => {
        return <tr key={index} onClick={() => this.doSelectResult(value.name)}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
              </tr>
      })

    return (
        <div className="row mt-4">
          <div className="col-sm-12 grid-margin">
          {this.state.submited?

            <div className="card h-100">
              <h4 className="card-header">Resultados de la búsqueda</h4>
              <div className="card-body d-inline-flex">
                {showItems.length?
                  <div className="col-sm-8">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th width="10%">#</th>
                        <th>Nombre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showItems}
                    </tbody>
                  </Table>
                  </div>
                  :<p className="text-center">Ninguno</p>
                }
                
                  <PokeDex pokemonSelect={this.state.pokemonSelect}></PokeDex>

              </div>
            </div>

            :<h4 className="text-center"> Use el formulario de busqueda para encontrar pokemons!</h4>
          }
          </div>
        </div>
    );
  }
}

ResultTable.defaultProps = {
  submited: false,
  pokemonData:[]
};

export default ResultTable;