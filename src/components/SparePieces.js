import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Piece from './Piece'

import { orientationTypes } from '../types'

const SparePieces = ({
  colour,
  height,
  uuid,
  width,
}) => (
  <div
    className="sparePieces"
    style={{
      display: 'flex',
      height,
      flexDirection: 'row',
      justifyContent: 'center',
      width,
    }}
  >
    <Piece
      piece={colour === 'b' ? 'p' : 'P'}
      square="spare"
      uuid={uuid}
    />
    <Piece
      piece={colour === 'b' ? 'r' : 'R'}
      square="spare"
      uuid={uuid}
    />
    <Piece
      piece={colour === 'b' ? 'n' : 'N'}
      square="spare"
      uuid={uuid}
    />
    <Piece
      piece={colour === 'b' ? 'b' : 'B'}
      square="spare"
      uuid={uuid}
    />
    <Piece
      piece={colour === 'b' ? 'q' : 'Q'}
      square="spare"
      uuid={uuid}
    />
    <Piece
      piece={colour === 'b' ? 'k' : 'K'}
      square="spare"
      uuid={uuid}
    />
  </div>
)

SparePieces.propTypes = {
  colour: PropTypes.oneOf(orientationTypes).isRequired,
  height: PropTypes.number.isRequired, // injected by react-redux
  /* eslint-disable react/no-unused-prop-types */
  uuid: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const mapState = state => ({
  height: state.height / 8,
})

export default connect(mapState)(SparePieces)
