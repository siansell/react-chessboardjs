import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { makeMove as getNewFen } from '../fen'
import { orientationTypes, pieceTypes, pieceThemeTypes } from '../types'

import { makeMoveAction } from '../store'

class Piece extends Component {
  state = {
    isLoaded: false,
    pieceImage: null,
  }

  componentDidMount() {
    const { piece, pieceTheme } = this.props
    this.loadImage(piece, pieceTheme)
  }

  componentWillReceiveProps(nextProps) {
    const { piece, pieceTheme } = nextProps
    const { piece: currentPiece, pieceTheme: currentPieceTheme } = this.props
    if (pieceTheme !== currentPieceTheme || piece !== currentPiece) {
      this.loadImage(piece, pieceTheme)
    }
  }

  loadImage = async (piece, pieceTheme) => {
    const pieceColour = piece.toUpperCase() === piece ? 'w' : 'b'
    const pieceImage = await import(`../src/components/assets/chesspieces/${pieceTheme}/${pieceColour}${piece.toUpperCase()}.svg`)
    this.setState({
      pieceImage,
    }, () => {
      this.setState({
        isLoaded: true,
      })
    })

    // we use our own <PieceDragLayer /> component
    this.props.connectDragPreview(getEmptyImage())
  }

  render() {
    const { isLoaded, pieceImage } = this.state
    if (!isLoaded) return null

    const {
      connectDragSource,
      isDragging,
      isDraggable,
      piece,
    } = this.props

    return connectDragSource(
      <img
        alt={piece}
        ref={(el) => { this.pieceImage = el }}
        src={pieceImage}
        style={{
          cursor: isDraggable ? 'pointer' : 'auto',
          height: '100%',
          opacity: isDragging ? 0.2 : 1,
          pointerEvents: isDraggable ? 'auto' : 'none',
          width: '100%',
        }}
      />)
  }
}

Piece.propTypes = {
  connectDragPreview: PropTypes.func.isRequired, // injected by react-dnd
  connectDragSource: PropTypes.func.isRequired, // injected by react-dnd
  isDragging: PropTypes.bool.isRequired, // injected by react-dnd
  isDraggable: PropTypes.bool.isRequired, // injected by react-redux
  piece: PropTypes.oneOf(pieceTypes).isRequired,
  pieceTheme: PropTypes.oneOf(pieceThemeTypes).isRequired, // injected by react-redux
  /* eslint-disable react/no-unused-prop-types */
  dropOffBoard: PropTypes.bool.isRequired, // injected by react-redux
  fen: PropTypes.string.isRequired, // injected by react-redux
  makeMove: PropTypes.func.isRequired, // injected by react-redux
  onDragStart: PropTypes.func.isRequired, // injected by react-redux
  onDrop: PropTypes.func.isRequired, // injected by react-redux
  onSnapbackEnd: PropTypes.func.isRequired, // injected by react-redux
  orientation: PropTypes.oneOf(orientationTypes).isRequired, // injected by react-redux
  square: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
}

const pieceSource = {
  canDrag(props) {
    return props.isDraggable
  },

  beginDrag(props, monitor, component) {
    const {
      fen,
      onDragStart,
      orientation,
      piece,
      pieceTheme,
      square,
    } = props

    const item = {
      fromSquare: square,
      piece,
      pieceTheme,
      size: component.pieceImage.width,
    }

    onDragStart(square, piece, fen, orientation)
    return item
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const { piece, fromSquare } = item
    const {
      dropOffBoard,
      fen,
      makeMove,
      onDrop,
      onSnapbackEnd,
      orientation,
      square,
    } = props

    // dropResult is null if dropped off board, { dropEffect "move", toSquare: "d5" } if dropped on a square
    const dropResult = monitor.getDropResult()
    let toSquare = dropResult ? dropResult.toSquare : null

    // we still pass this, even if onDrop returns 'snapback'
    // otherwise needs a refactor
    const newPosition = getNewFen(fen, piece, fromSquare, toSquare)

    const onDropResult = onDrop(square, toSquare, piece, newPosition, fen, orientation)
    if (onDropResult === 'trash') toSquare = null // the piece is removed

    const shouldDropOffBoard = !monitor.didDrop() && dropOffBoard && onDropResult !== 'snapback'
    const shouldMovePiece = dropResult && onDropResult !== 'snapback'

    if (shouldDropOffBoard || shouldMovePiece) {
      return makeMove(piece, fromSquare, toSquare)
    }

    // else it's a snapback
    return onSnapbackEnd(piece, square, fen, orientation)
  },
}

const collect = (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
  connectDragPreview: dndConnect.dragPreview(),
  isDragging: monitor.isDragging(),
})

const mapState = state => ({
  dropOffBoard: state.dropOffBoard,
  fen: state.fen,
  isDraggable: state.isDraggable,
  onDragStart: state.events.onDragStart,
  onDrop: state.events.onDrop,
  onSnapbackEnd: state.events.onSnapbackEnd,
  orientation: state.orientation,
  pieceTheme: state.pieceTheme,
})

const mapDispatch = dispatch => ({
  makeMove: (piece, fromSquare, toSquare) => dispatch(makeMoveAction(piece, fromSquare, toSquare)),
})

export default connect(mapState, mapDispatch)(DragSource('piece', pieceSource, collect)(Piece))
