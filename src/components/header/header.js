import React, { Component } from "react";
import { Navbar, Nav, Form,  FormControl, Button} from 'react-bootstrap';

import "./header.css";

export class Header extends Component {

  constructor(props) {
    console.log("-- Header init --");
    super(props);
    this.state = {
      onSearchResult: this.props.onSearchResult,
      pokemonData: this.props.pokemonData,
    };
  }

  state = {
    searchText : "",
    pokemonData : [],
  }

  getName = (e) =>{
    let name = e.target.value; 
    this.setState({
        searchText:name
    });
  }

  //Click/Enter event "Buscar"
  onKeyPressEnter = (e) =>{
    if(e.key === 'Enter'){
      this.doSearch(e);
    }
  }

  doSearch = (e) =>{
    e.preventDefault();
    if (!this.state.searchText.length)
      return;

    //filter all pokemons using customer text
    const found = this.props.pokemonData.filter(el => el.name.includes(this.state.searchText));
    this.state.onSearchResult(found);

  }

  //sync with parent
  componentDidUpdate(prevProps) {
    if(prevProps.pokemonData !== this.props.pokemonData) {
      this.setState({pokemonData: this.props.pokemonData});
    }
  }

  render() {
    return (
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="#home"><h1>Pokemon Finder</h1>El que quiere pokemons, que los busque.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
              <Form inline className="w-25">
                <FormControl onChange={this.getName} onKeyPress={this.onKeyPressEnter} type="text" placeholder="Ingrese el nombre a buscar" />
                <Button onClick={this.doSearch}>Buscar</Button>
              </Form>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

Header.defaultProps = {
  onSearchResult: null,
  pokemonData: null,
};

export default Header;