import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import _ from "underscore";

import Board from "./board.jsx";

export default function() {
  const [moveStack, setMoveStack] = useState([]),
    [currentMove, setCurrentMove] = useState({
      name: "Initial position",
      id: null
    }),
    [nextMoves, setNextMoves] = useState([]),
    moveCallback = move => {
      setMoveStack([ ...moveStack, move.san]);
    },
    undoCallback = () => {
      setMoveStack(moveStack.slice(0, -1));
    };
  useEffect(() => {
    axios.post('/api/opening/', {
      move: currentMove
    }).then(response => {
      setNextMoves(response.data);
    });
  }, []);
  return (<Row>
    <Col xs={12}>
      <h1>Openings</h1>
    </Col>
    <Col xs={6}>
      <Board
        moveCallback={moveCallback}
        undoCallback={undoCallback}
      />
    </Col>
    <Col xs={6}>
      <h3>{currentMove.name}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Move number</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {_.chunk(moveStack, 2).map((movePair, i) => {
            return (<tr key={i}>
              <td>{i+1}</td>
              <td>{movePair[0]}</td>
              <td>{movePair[1]}</td>
            </tr>);
          })}
        </tbody>
      </Table>
    </Col>
    <Col xs={12} className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Move</th>
            <th>Name</th>
            <th>Evaluation</th>
          </tr>
        </thead>
        <tbody>
          {nextMoves.map(move => {
            console.log(move)
            return (<tr key={move.id || -1}>
              <td>{move.san}</td>
              <td>{move.name}</td>
              <td></td>
            </tr>)
          })}
        </tbody>
      </Table>
    </Col>
  </Row>);
};
