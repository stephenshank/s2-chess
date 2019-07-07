# S2 Chess

Exploring [chess.js](https://github.com/jhlywa/chess.js), [chessboardjsx](https://www.chessboardjsx.com/), and perhaps one day [stockfish-js](https://github.com/exoticorn/stockfish-js) and some homebrewed reinforcement learning.

## Develop

### Requirements

Node.js (8.11.2) and Anaconda (4.6.14)

### Install

```
git clone https://github.com/stephenshank/s2-chess
cd s2-chess
conda env create -f environment.yml
yarn
```

### Develop

#### API

With the s2-chess conda environment active,

```
yarn api
```

`http://localhost:8000/api/` should yield `{"result": 1}`.

#### Frontend

With the API running, enter

```
yarn frontend
```

and you should be directed to a URL like `http://localhost:$PORT` in your default browser.