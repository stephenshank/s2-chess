import Chessboard from "chessboardjsx";

const React = require('react');
const ReactDOM = require('react-dom');
const Chess = require('chess.js');

const ruy_lopez = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5',
  'a6', 'Ba4', 'Nf6'
];

class MyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.state = { fen: this.chess.fen() };
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
  }
  render() {
    return (<Chessboard
      position={this.state.fen}
    />);
  }
}

ReactDOM.render(
  <MyBoard />,
  document.body.appendChild(document.createElement('div'))
)

