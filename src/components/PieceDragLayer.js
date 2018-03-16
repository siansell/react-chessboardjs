import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'

const loadPieceImages = async (item) => {
  const { piece, pieceTheme } = item
  const pieceColour = piece.toUpperCase() === piece ? 'w' : 'b'
  const img = await import(`../src/components/assets/chesspieces/${pieceTheme}/${pieceColour}${piece.toUpperCase()}.svg`)
  return img
}

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

const getItemStyles = (props) => {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

class PieceDragLayer extends Component {
  state = { image: null }

  async componentWillReceiveProps(nextProps) {
    if (!nextProps.item) return
    if (!this.props.item || (nextProps.item.pieceTheme !== this.props.item.pieceTheme)) {
      this.setState({
        image: await loadPieceImages(nextProps.item),
      })
    }
  }

  renderItem = (itemType, item) => (
    <img
      alt={itemType}
      src={this.state.image}
      style={{
        height: item.size,
        width: item.size,
      }}
    />
  )

  render() {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

PieceDragLayer.propTypes = {
  item: PropTypes.object, // injected by react-dnd
  itemType: PropTypes.string, // injected by react-dnd
  isDragging: PropTypes.bool.isRequired, // injected by react-dnd
}

PieceDragLayer.defaultProps = {
  item: {},
  itemType: null,
}

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
})

export default DragLayer(collect)(PieceDragLayer)
