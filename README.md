## react-chessboardjs

**Work in progress**. Use at own risk.

`yarn add react-chessboardjs`

A chessboard component for React, inspired by [chessboard.js](https://chessboardjs.com/).

### Usage

All props are optional.

```JSX
import React from 'react'
import Chessboard from 'react-chessboardjs'

const App = () => (
  <Chessboard
    dropOffBoard={false} // If a piece is dragged off the board, remove it. Default: false
    blackSquareColour="steelblue" // Default: '#b58863'
    fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R" // The 'pieces' part of a fen string
    // (additional info // such as side to move will be stripped). ['start' | 'empty'] also valid.
    // Default: 'start'
    isDraggable={true} // Can the pieces be dragged? Default: true
    orientation="b" // ['w', 'b'] Default: 'w'
    pieceTheme="uscf" // ['alpha', 'uscf', 'wikipedia'] Default: 'wikipedia'
    showCoordinates={false} // Default: true
    size={400} // String ('100%', of container) | number (px). If expressed as a percentage,
    // the board will resize with the window resize event. default: 400
    whiteSquareColour="aliceblue" // Default: '#f0d9b5'

    // Events: similar to chessboard.js events
    onChange={(oldPos, newPos) => console.log('onChange fired', oldPos, newPos)}
    onDragMove={(algebraic, fromSquare, piece, fen, orientation) =>
      console.log('onDragMove fired', algebraic, fromSquare, piece, fen, orientation)}
    onDragStart={(square, piece, fen, orientation) =>
      console.log('onDragStart fired', square, piece, fen, orientation)}
    onDrop={(square, toSquare, piece, newPosition, fen, orientation) =>
      console.log('onDrop fired', square, toSquare, piece, newPosition, fen, orientation)}
    onMouseOutSquare={(algebraic, piece, fen, orientation) =>
      console.log('onMouseOutSquare fired', algebraic, piece, fen, orientation)}
    onMouseOverSquare={(algebraic, piece, fen, orientation) =>
      console.log('onMouseOverSquare fired', algebraic, piece, fen, orientation)}
    onMoveEnd={(oldPos, newPos) => console.log('onMoveEnd fired', oldPos, newPos)}
    onSnapbackEnd={(piece, square, fen, orientation) =>
      console.log('onSnapbackEnd fired', piece, square, fen, orientation)}
  />
)

export default App
```

## TODO:
- border for chessboard? styles prop? need to add classnames to pieces, squares
- sparePieces prop (if set, can drag pieces onto board)
- animation?
- tests
- examples (PGN viewer etc.)
