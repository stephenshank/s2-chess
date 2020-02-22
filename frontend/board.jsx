import React, { Component } from "react";
import Chess from "chess.js";
import Chessboard from "chessboardjsx";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: "start",
      dropSquareStyle: {},
      squareStyles: {},
      pieceSquare: "",
      square: "",
      history: []
    };
  }

  componentDidMount() {
    this.game = new Chess();
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
      undo: false
    }));
  };

  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
      undo: false
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    if (move === null) return;
    this.props.moveCallback(move);
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
      undo: false
    }));
  };

  onMouseOverSquare = square => {
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle: { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" },
      undo: false
    });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
      undo: false
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    if (move === null) return;
    this.props.moveCallback(move);

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
      undo: false
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } },
      undo: false
    });

  undo = () => {
    this.game.undo();
    this.props.undoCallback();
    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
      undo: true
    });
  }

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;
    return (<div>
      <button
        onClick={this.undo}
      >
        Undo
      </button>
      <Chessboard
        id="humanVsHuman"
        width={this.props.size}
        position={fen}
        onDrop={this.onDrop}
        onMouseOverSquare={this.onMouseOverSquare}
        onMouseOutSquare={this.onMouseOutSquare}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        }}
        squareStyles={squareStyles}
        dropSquareStyle={dropSquareStyle}
        onDragOverSquare={this.onDragOverSquare}
        onSquareClick={this.onSquareClick}
        onSquareRightClick={this.onSquareRightClick}
        undo={this.state.undo}
      />
    </div>);
  }
}

Board.defaultProps = {
  size: 500
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};

export default Board;
