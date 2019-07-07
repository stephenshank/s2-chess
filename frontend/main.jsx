import Chessboard from "chessboardjsx";
import "bootstrap";

const React = require('react');
const ReactDOM = require('react-dom');
const Chess = require('chess.js');
const axios = require('axios');

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"


const ruy_lopez = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5',
  'a6', 'Ba4', 'Nf6'
];

class MyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.state = {
      fen: this.chess.fen(),
      error: false
    };
    this.i = 0;
  }
  componentDidMount() {
    setInterval(() => {
      this.chess.move(ruy_lopez[this.i]);
      this.i++;
      if (this.i == ruy_lopez.length) {
        this.i = 0;
        this.chess = new Chess();
      }
      this.setState({ fen: this.chess.fen() });
    }, 1000);
    axios.get('/api')
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }
  render() {
    const { error } = this.state;
    return (<div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
            <h3>{error ? "" : "S2 Chess"}</h3>
        </div>
        <ul className="list-unstyled components">
            <li>
                <a href="#">Openings</a>
            </li>
            <li>
                <a href="#">Tactics</a>
            </li>
            <li>
                <a href="#">Games</a>
            </li>
        </ul>
      </nav>

      <div className="container-fluid" id="content">
        <h1>Openings - Ruy Lopez</h1>
        <Chessboard
          width={500}
          position={this.state.fen}
        />
      </div>
    </div>);
  }
}

ReactDOM.render(
  <MyBoard />,
  document.body.appendChild(document.createElement('div'))
)
