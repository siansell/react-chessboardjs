import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import _ from 'lodash'

import Coordinate from './Coordinate'
import Piece from './Piece'
import PieceDragLayer from './PieceDragLayer'
import SparePieces from './SparePieces'
import Square from './Square'

import { setHeightAction } from '../store'
import { getFenParts } from '../fen'
import { orientationTypes } from '../types'

class Chessboard extends Component {
  componentDidMount() {
    const { setHeight, width } = this.props
    setHeight(this.container.offsetWidth)
    // if the width is expressed as a percentage '100%', '80%' etc.,
    // resize the board with the window resize event
    if (typeof width === 'string') {
      this.resizeEventListenerFunc = _.debounce(this.setHeight, 100)
      window.addEventListener('resize', this.resizeEventListenerFunc, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.width !== typeof this.props.width) {
      if (typeof nextProps.width === 'number') {
        this.props.setHeight(nextProps.width)
        window.removeEventListener('resize', this.resizeEventListenerFunc)
      }
      if (typeof nextProps.width === 'string') {
        this.resizeEventListenerFunc = _.debounce(this.setHeight, 100)
        window.addEventListener('resize', this.resizeEventListenerFunc, false)
        setTimeout(() => {
          this.setHeight()
        }, 0)
      }
    }
  }

  setHeight = () => {
    this.props.setHeight(this.container.offsetWidth)
  }

  renderSquares = () => {
    const { fen, orientation, showCoordinates } = this.props
    const fenParts = getFenParts(fen)
    const squares = []
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const rank = orientation === 'w' ? i : Math.abs(i - 7)
        const file = orientation === 'w' ? j : Math.abs(j - 7)
        const fileChar = String.fromCharCode(file + 97)
        const rankChar = (Math.abs(rank - 7) + 1).toString()
        const algebraic = `${fileChar}${rankChar}`
        const isBlackSquare = (rank + file) % 2 !== 0
        const piece = fenParts[rank].charAt(file)
        /* eslint-disable function-paren-newline */
        squares.push(
        /* eslint-enable function-paren-newline */
          <Square
            key={algebraic}
            algebraic={algebraic}
            isBlackSquare={isBlackSquare}
            piece={piece !== '1' ? piece : null}
          >
            {showCoordinates && ((orientation === 'w' && rank === 7) || (orientation === 'b' && rank === 0))
              && <Coordinate display="file" text={fileChar} />}
            {showCoordinates && ((orientation === 'w' && file === 0) || (orientation === 'b' && file === 7))
              && <Coordinate display="rank" text={rankChar} />}
            {piece !== '1' && (
              <Piece
                piece={piece}
                square={algebraic}
              />
            )}
          </Square>,
        /* eslint-disable function-paren-newline */
        )
        /* eslint-enable function-paren-newline */
      }
    }
    return squares
  }

  render() {
    const {
      height,
      isDraggable,
      orientation,
      style,
      sparePieces,
      width,
    } = this.props

    const baseStyles = {
      display: 'flex',
      flexWrap: 'wrap',
      height: this.container ? this.container.offsetWidth : height,
      width,
    }
    const combinedStyles = Object.assign({}, baseStyles, style)

    return (
      <div className="chessboardContainer">
        {sparePieces && (
          <SparePieces colour={orientation === 'w' ? 'b' : 'w'} width={width} />
        )}
        <div
          className="chessboard"
          ref={(el) => { this.container = el }}
          style={combinedStyles}
        >
          {this.renderSquares()}
          {isDraggable && <PieceDragLayer />}
        </div>
        {sparePieces && (
          <SparePieces colour={orientation} width={width} />
        )}
      </div>
    )
  }
}

Chessboard.propTypes = {
  fen: PropTypes.string.isRequired, // injected by react-redux
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // injected by react-redux
  isDraggable: PropTypes.bool.isRequired, // injected by react-redux
  orientation: PropTypes.oneOf(orientationTypes).isRequired, // injected by react-redux
  setHeight: PropTypes.func.isRequired, // injected by react-redux
  showCoordinates: PropTypes.bool.isRequired, // injected by react-redux
  /* eslint-disable react/forbid-prop-types */
  sparePieces: PropTypes.bool.isRequired,
  style: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

Chessboard.defaultProps = {
  height: null,
  style: {},
}

const mapState = state => ({
  fen: state.fen,
  height: state.height,
  isDraggable: state.isDraggable,
  orientation: state.orientation,
  showCoordinates: state.showCoordinates,
  sparePieces: state.sparePieces,
})

const mapDispatch = dispatch => ({
  setHeight: height => dispatch(setHeightAction(height)),
})

export default connect(mapState, mapDispatch)(DragDropContext(HTML5Backend)(Chessboard))
