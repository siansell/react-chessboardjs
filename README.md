## Work in progress

`yarn add react-chessboardjs`

A chessboard component for React, inspired by [chessboard.js](https://chessboardjs.com/).

### Usage example

All props are optional.

```JSX
import React, { Component } from 'react'
import Chessboard from '@siansell/react-chessboard'

class App extends Component {
  render() {
    return (
      <Chessboard
        // dropOffBoard // default: false
        blackSquareColour="steelblue" // default: '#b58863'
        fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" // default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
        // isDraggable={false} // default: true
        onChange={(oldPos, newPos) => console.log('onChange fired', oldPos, newPos)}
        onDragMove={(algebraic, fromSquare, piece, fen, orientation) =>
          console.log('onDragMove fired', algebraic, fromSquare, piece, fen, orientation)}
        onDragStart={(square, piece, fen, orientation) =>
          console.log('onDragStart fired', square, piece, fen, orientation)}
        onDrop={(square, toSquare, piece, newPosition, fen, orientation) =>
          console.log('onDrop fired', square, toSquare, piece, newPosition, fen, orientation)}
        // onMouseOutSquare={(algebraic, piece, fen, orientation) =>
          // console.log('onMouseOutSquare fired', algebraic, piece, fen, orientation)}
        // onMouseOverSquare={(algebraic, piece, fen, orientation) =>
          // console.log('onMouseOverSquare fired', algebraic, piece, fen, orientation)}
        onMoveEnd={(oldPos, newPos) => console.log('onMoveEnd fired', oldPos, newPos)}
        onSnapbackEnd={(piece, square, fen, orientation) =>
          console.log('onSnapbackEnd fired', piece, square, fen, orientation)}
        orientation="b" // ['w', 'b'] default: 'w'
        pieceTheme="uscf" // ['alpha', 'uscf', 'wikipedia'] default: 'wikipedia'
        showCoordinates={false} // default: true
        size={400} // string ('100%') or number of pixels. if expressed as a percentage,
        // the board will resize on the window.resize event. default: 400
        whiteSquareColour="aliceblue" // default: '#f0d9b5'
      />
    )
  }
}

export default App
```

## TODO:
- docs
- sparePieces prop (if set, can drag pieces onto board)
- animation?
- tests
- green copy square appears briefly in chrome on start drag