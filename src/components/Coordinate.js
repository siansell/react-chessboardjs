import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { orientationTypes, rankOrFileTypes } from '../types'

const Coordinate = ({ display, orientation, text }) => (
  <span
    style={{
      bottom: (orientation === 'w' && display === 'file') || (orientation === 'b' && display === 'file') ? 0 : null,
      left: (orientation === 'w' && display === 'rank') || (orientation === 'b' && display === 'rank') ? 0 : null,
      margin: 1,
      pointerEvents: 'none',
      position: 'absolute',
      right: (orientation === 'w' && display === 'file') || (orientation === 'b' && display === 'file') ? 0 : null,
      top: (orientation === 'w' && display === 'rank') || (orientation === 'b' && display === 'rank') ? 0 : null,
    }}
  >
    {text}
  </span>
)

Coordinate.propTypes = {
  display: PropTypes.oneOf(rankOrFileTypes).isRequired,
  orientation: PropTypes.oneOf(orientationTypes).isRequired, // injected by react-redux
  text: PropTypes.string.isRequired,
}

const mapState = state => ({ orientation: state.orientation })

export default connect(mapState)(Coordinate)
