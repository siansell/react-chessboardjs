import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import uuidv4 from 'uuid/v4'
import 'babel-polyfill'

import Chessboard from './components/Chessboard'

import { orientationTypes, pieceThemeTypes } from './types'

import createStoreWithId, {
  initialState,
  setBlackSquareColourAction,
  setDropOffBoardAction,
  setFenAction,
  setIsDraggableAction,
  setEventFuncAction,
  setOrientationAction,
  setPieceThemeAction,
  setShowCoordinatesAction,
  setSparePiecesAction,
  setWhiteSquareColourAction,
} from './store'

class ChessboardProvider extends Component {
  componentWillMount() {
    const id = uuidv4()
    // unique id, required for multiple chessboards on a single page
    // the redux store and reducers etc are namespaced with this
    // There will be a unique store for each Chessboard instance
    this.uuid = id
    this.store = createStoreWithId(id)
    const { store, uuid } = this

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
      onResize,
      onSnapbackEnd,
      onSquareClick,
      orientation,
      pieceTheme,
      showCoordinates,
      sparePieces,
      whiteSquareColour,
    } = this.props
    // other props
    if (blackSquareColour !== initialState.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(uuid, blackSquareColour))
    }
    if (dropOffBoard !== initialState.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(uuid, dropOffBoard))
    }
    if (fen !== initialState.fen) {
      store.dispatch(setFenAction(uuid, fen))
    }
    if (isDraggable !== initialState.isDraggable) {
      store.dispatch(setIsDraggableAction(uuid, isDraggable))
    }
    if (orientation !== initialState.orientation) {
      store.dispatch(setOrientationAction(uuid, orientation))
    }
    if (pieceTheme !== initialState.pieceTheme) {
      store.dispatch(setPieceThemeAction(uuid, pieceTheme))
    }
    if (showCoordinates !== initialState.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(uuid, showCoordinates))
    }
    if (sparePieces !== initialState.sparePieces) {
      store.dispatch(setSparePiecesAction(uuid, sparePieces))
    }
    if (whiteSquareColour !== initialState.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(uuid, whiteSquareColour))
    }
    // set event handlers
    store.dispatch(setEventFuncAction(uuid, 'onChange', onChange))
    store.dispatch(setEventFuncAction(uuid, 'onDragMove', onDragMove))
    store.dispatch(setEventFuncAction(uuid, 'onDragStart', onDragStart))
    store.dispatch(setEventFuncAction(uuid, 'onDragStart', onDragStart))
    store.dispatch(setEventFuncAction(uuid, 'onDrop', onDrop))
    store.dispatch(setEventFuncAction(uuid, 'onMouseOutSquare', onMouseOutSquare))
    store.dispatch(setEventFuncAction(uuid, 'onMouseOverSquare', onMouseOverSquare))
    store.dispatch(setEventFuncAction(uuid, 'onMoveEnd', onMoveEnd))
    store.dispatch(setEventFuncAction(uuid, 'onReszize', onResize))
    store.dispatch(setEventFuncAction(uuid, 'onSnapbackEnd', onSnapbackEnd))
    store.dispatch(setEventFuncAction(uuid, 'onSquareClick', onSquareClick))
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
      sparePieces,
      whiteSquareColour,
    } = nextProps
    const { store, uuid } = this
    if (blackSquareColour !== this.props.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(uuid, blackSquareColour))
    }
    if (dropOffBoard !== this.props.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(uuid, dropOffBoard))
    }
    if (fen !== this.props.fen) {
      store.dispatch(setFenAction(uuid, fen))
    }
    if (isDraggable !== this.props.isDraggable) {
      store.dispatch(setIsDraggableAction(uuid, isDraggable))
    }
    if (orientation !== this.props.orientation) {
      store.dispatch(setOrientationAction(uuid, orientation))
    }
    if (pieceTheme !== this.props.pieceTheme) {
      store.dispatch(setPieceThemeAction(uuid, pieceTheme))
    }
    if (showCoordinates !== this.props.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(uuid, showCoordinates))
    }
    if (sparePieces !== this.props.sparePieces) {
      store.dispatch(setSparePiecesAction(uuid, sparePieces))
    }
    if (whiteSquareColour !== this.props.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(uuid, whiteSquareColour))
    }
  }

  render() {
    const { width, style } = this.props
    return (
      <Provider store={this.store}>
        <Chessboard
          uuid={this.uuid}
          style={style}
          width={width}
        />
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
  onResize: PropTypes.func,
  onSnapbackEnd: PropTypes.func,
  onSquareClick: PropTypes.func,
  orientation: PropTypes.oneOf(orientationTypes),
  pieceTheme: PropTypes.oneOf(pieceThemeTypes),
  showCoordinates: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /* eslint-disable react/forbid-prop-types */
  sparePieces: PropTypes.bool,
  style: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
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
  onResize: initialState.events.onResize,
  onSnapbackEnd: initialState.events.onSnapbackEnd,
  onSquareClick: initialState.events.onSquareClick,
  orientation: initialState.orientation,
  pieceTheme: initialState.pieceTheme,
  showCoordinates: initialState.showCoordinates,
  width: initialState.width,
  sparePieces: initialState.sparePieces,
  style: {},
  whiteSquareColour: initialState.whiteSquareColour,
}

export default ChessboardProvider
