import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { makeMove, replaceFenConstants, removeExtraFenInfo } from './fen'

const noop = () => {}

export const initialState = {
  blackSquareColour: '#b58863',
  dropOffBoard: false,
  events: {
    onChange: noop,
    onDragMove: noop,
    onDragStart: noop,
    onDrop: noop,
    onMouseOutSquare: noop,
    onMouseOverSquare: noop,
    onMoveEnd: noop,
    onResize: noop,
    onSnapbackEnd: noop,
    onSquareClick: noop,
  },
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
  height: 0,
  isDraggable: true,
  orientation: 'w',
  pieceTheme: 'wikipedia',
  showCoordinates: true,
  sparePieces: false,
  width: 400,
  whiteSquareColour: '#f0d9b5',
}

const MAKE_MOVE = 'MAKE_MOVE'
const SET_BLACK_SQUARE_COLOUR = 'SET_BLACK_SQUARE_COLOUR'
const SET_DROP_OFF_BOARD = 'SET_DROP_OFF_BOARD'
const SET_FEN = 'SET_FEN'
const SET_HEIGHT = 'SET_HEIGHT'
const SET_IS_DRAGGABLE = 'SET_IS_DRAGGABLE'
const SET_EVENT_FUNC = 'SET_EVENT_FUNC'
const SET_ORIENTATION = 'SET_ORIENTATION'
const SET_PIECE_THEME = 'SET_PIECE_THEME'
const SET_SHOW_COORDINATES = 'SET_SHOW_COORDINATES'
const SET_SPARE_PIECES = 'SET_SPARE_PIECES'
const SET_WHITE_SQUARE_COLOUR = 'SET_WHITE_SQUARE_COLOUR'

export const makeMoveAction = (id, piece, fromSquare, toSquare) => (dispatch, getState) => {
  const oldPos = getState().fen
  dispatch({ type: `${id}/${MAKE_MOVE}`, payload: { piece, fromSquare, toSquare } })
  const newPos = getState().fen
  getState().events.onChange(oldPos, newPos)
  if (toSquare) getState().events.onMoveEnd(oldPos, newPos)
}
export const setBlackSquareColourAction = (id, colour) => ({ type: `${id}/${SET_BLACK_SQUARE_COLOUR}`, payload: colour })
export const setDropOffBoardAction = (id, value) => ({ type: `${id}/${SET_DROP_OFF_BOARD}`, payload: value })
export const setEventFuncAction = (id, event, f) => ({ type: `${id}/${SET_EVENT_FUNC}`, payload: { event, func: f } })
export const setFenAction = (id, fen) => (dispatch, getState) => {
  const oldPos = getState().fen
  dispatch({ type: `${id}/${SET_FEN}`, payload: fen })
  const newPos = getState().fen
  getState().events.onChange(oldPos, newPos)
}
export const setIsDraggableAction = (id, value) => ({ type: `${id}/${SET_IS_DRAGGABLE}`, payload: value })
export const setHeightAction = (id, height) => (dispatch, getState) => {
  const oldHeight = getState().height
  dispatch({ type: `${id}/${SET_HEIGHT}`, payload: height })
  const newHeight = getState().height
  getState().events.onResize(oldHeight, newHeight)
}
export const setOrientationAction = (id, orientation) => ({ type: `${id}/${SET_ORIENTATION}`, payload: orientation })
export const setPieceThemeAction = (id, theme) => ({ type: `${id}/${SET_PIECE_THEME}`, payload: theme })
export const setShowCoordinatesAction = (id, show) => ({ type: `${id}/${SET_SHOW_COORDINATES}`, payload: show })
export const setSparePiecesAction = (id, value) => ({ type: `${id}/${SET_SPARE_PIECES}`, payload: value })
export const setWhiteSquareColourAction = (id, colour) => ({ type: `${id}/${SET_WHITE_SQUARE_COLOUR}`, payload: colour })

const reducer = id => (state = initialState, action) => {
  switch (action.type) {
    case `${id}/${MAKE_MOVE}`: {
      const { piece, fromSquare, toSquare } = action.payload
      return {
        ...state,
        fen: makeMove(state.fen, piece, fromSquare, toSquare),
      }
    }
    case `${id}/${SET_BLACK_SQUARE_COLOUR}`:
      return {
        ...state,
        blackSquareColour: action.payload,
      }
    case `${id}/${SET_DROP_OFF_BOARD}`:
      return {
        ...state,
        dropOffBoard: action.payload,
      }
    case `${id}/${SET_FEN}`:
      return {
        ...state,
        fen: removeExtraFenInfo(replaceFenConstants(action.payload)),
      }
    case `${id}/${SET_EVENT_FUNC}`: {
      const events = {}
      Object.keys(state.events).forEach((e) => {
        if (e === action.payload.event) {
          events[e] = action.payload.func
        } else {
          events[e] = state.events[e]
        }
      })
      return {
        ...state,
        events,
      }
    }
    case `${id}/${SET_HEIGHT}`: {
      return {
        ...state,
        height: action.payload,
      }
    }
    case `${id}/${SET_IS_DRAGGABLE}`:
      return {
        ...state,
        isDraggable: action.payload,
      }
    case `${id}/${SET_ORIENTATION}`:
      return {
        ...state,
        orientation: action.payload,
      }
    case `${id}/${SET_PIECE_THEME}`:
      return {
        ...state,
        pieceTheme: action.payload,
      }
    case `${id}/${SET_SHOW_COORDINATES}`:
      return {
        ...state,
        showCoordinates: action.payload,
      }
    case `${id}/${SET_SPARE_PIECES}`:
      return {
        ...state,
        sparePieces: action.payload,
      }
    case `${id}/${SET_WHITE_SQUARE_COLOUR}`:
      return {
        ...state,
        whiteSquareColour: action.payload,
      }
    default:
      return state
  }
}

const createStoreWithId = id => createStore(
  reducer(id),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

export default createStoreWithId
