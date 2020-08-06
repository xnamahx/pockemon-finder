import React, { Component } from "react";
import {Button} from 'react-bootstrap';

import "./footer.css";

export class Footer extends Component {

  constructor(props) {
    console.log("-- Footer init --");
    super(props);
  }

  render() {
    return (
      <div className="footer">
      	<span>creado por <b>Gustavo Fernandez</b></span>  
		<span className="float-right"><Button  onClick={() => window.open('https://github.com/xnamahx/pokemon-finder')}>Link a mi Repo</Button></span>
      </div>  
    );
  }
}

export default Footer;