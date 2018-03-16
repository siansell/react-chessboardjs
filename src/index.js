import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import Chessboard from './components/Chessboard'

import { orientationTypes, pieceThemeTypes } from './types'

import store, {
  initialState,
  setBlackSquareColourAction,
  setDropOffBoardAction,
  setFenAction,
  setIsDraggableAction,
  setEventFuncAction,
  setOrientationAction,
  setPieceThemeAction,
  setWhiteSquareColourAction,
  setShowCoordinatesAction,
} from './store'

class ChessboardProvider extends Component {
  constructor(props) {
    super(props)

    // set state from passed in props
    const {
      blackSquareColour,
      dropOffBoard,
      fen,
      isDraggable,
      onChange,
      onDragMove,
      onDragStart,
      onDrop,
      onMoveEnd,
      onMouseOutSquare,
      onMouseOverSquare,
      onSnapbackEnd,
      orientation,
      pieceTheme,
      showCoordinates,
      whiteSquareColour,
    } = props
    // other props
    if (blackSquareColour !== initialState.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(blackSquareColour))
    }
    if (dropOffBoard !== initialState.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(dropOffBoard))
    }
    if (fen !== initialState.fen) {
      store.dispatch(setFenAction(fen))
    }
    if (isDraggable !== initialState.isDraggable) {
      store.dispatch(setIsDraggableAction(isDraggable))
    }
    if (orientation !== initialState.orientation) {
      store.dispatch(setOrientationAction(orientation))
    }
    if (pieceTheme !== initialState.pieceTheme) {
      store.dispatch(setPieceThemeAction(pieceTheme))
    }
    if (showCoordinates !== initialState.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(showCoordinates))
    }
    if (whiteSquareColour !== initialState.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(whiteSquareColour))
    }
    // set event handlers
    store.dispatch(setEventFuncAction('onChange', onChange))
    store.dispatch(setEventFuncAction('onDragMove', onDragMove))
    store.dispatch(setEventFuncAction('onDragStart', onDragStart))
    store.dispatch(setEventFuncAction('onDragStart', onDragStart))
    store.dispatch(setEventFuncAction('onDrop', onDrop))
    store.dispatch(setEventFuncAction('onMouseOutSquare', onMouseOutSquare))
    store.dispatch(setEventFuncAction('onMouseOverSquare', onMouseOverSquare))
    store.dispatch(setEventFuncAction('onMoveEnd', onMoveEnd))
    store.dispatch(setEventFuncAction('onSnapbackEnd', onSnapbackEnd))
  }

  componentWillReceiveProps(nextProps) {
    // update state if props have changed
    const {
      blackSquareColour,
      dropOffBoard,
      fen,
      isDraggable,
      orientation,
      pieceTheme,
      showCoordinates,
      whiteSquareColour,
    } = nextProps
    if (blackSquareColour !== this.props.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(blackSquareColour))
    }
    if (dropOffBoard !== this.props.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(dropOffBoard))
    }
    if (fen !== this.props.fen) {
      store.dispatch(setFenAction(fen))
    }
    if (isDraggable !== this.props.isDraggable) {
      store.dispatch(setIsDraggableAction(isDraggable))
    }
    if (orientation !== this.props.orientation) {
      store.dispatch(setOrientationAction(orientation))
    }
    if (pieceTheme !== this.props.pieceTheme) {
      store.dispatch(setPieceThemeAction(pieceTheme))
    }
    if (showCoordinates !== this.props.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(showCoordinates))
    }
    if (whiteSquareColour !== this.props.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(whiteSquareColour))
    }
  }

  render() {
    const { size } = this.props
    return (
      <Provider store={store}>
        <Chessboard width={size} />
      </Provider>
    )
  }
}

ChessboardProvider.propTypes = {
  blackSquareColour: PropTypes.string,
  dropOffBoard: PropTypes.bool,
  fen: PropTypes.string,
  isDraggable: PropTypes.bool,
  onChange: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onMouseOutSquare: PropTypes.func,
  onMouseOverSquare: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onSnapbackEnd: PropTypes.func,
  orientation: PropTypes.oneOf(orientationTypes),
  pieceTheme: PropTypes.oneOf(pieceThemeTypes),
  showCoordinates: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  whiteSquareColour: PropTypes.string,
}

ChessboardProvider.defaultProps = {
  blackSquareColour: initialState.blackSquareColour,
  dropOffBoard: initialState.dropOffBoard,
  fen: initialState.fen,
  isDraggable: initialState.isDraggable,
  onChange: initialState.events.onChange,
  onDragMove: initialState.events.onDragMove,
  onDragStart: initialState.events.onDragStart,
  onDrop: initialState.events.onDrop,
  onMouseOutSquare: initialState.events.onMouseOutSquare,
  onMouseOverSquare: initialState.events.onMouseOverSquare,
  onMoveEnd: initialState.events.onMoveEnd,
  onSnapbackEnd: initialState.events.onSnapbackEnd,
  orientation: initialState.orientation,
  pieceTheme: initialState.pieceTheme,
  showCoordinates: initialState.showCoordinates,
  size: initialState.width,
  whiteSquareColour: initialState.whiteSquareColour,
}

export default ChessboardProvider
