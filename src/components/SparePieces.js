import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Piece from './Piece'

import { orientationTypes } from '../types'

const SparePieces = ({ colour, height, orientation }) => (
  <div
    className="sparePieces"
    style={{
      display: 'flex',
      height,
      flexDirection: 'row',
      marginBottom: orientation !== colour ? height / 8 : 0,
      marginTop: orientation === colour ? height / 8 : 0,
      textAlign: 'center',
    }}
  >
    <Piece
      piece={colour === 'b' ? 'p' : 'P'}
      square="spare"
    />
    <Piece
      piece={colour === 'b' ? 'r' : 'R'}
      square="spare"
    />
    <Piece
      piece={colour === 'b' ? 'n' : 'N'}
      square="spare"
    />
    <Piece
      piece={colour === 'b' ? 'b' : 'B'}
      square="spare"
    />
    <Piece
      piece={colour === 'b' ? 'q' : 'Q'}
      square="spare"
    />
    <Piece
      piece={colour === 'b' ? 'k' : 'K'}
      square="spare"
    />
  </div>
)

SparePieces.propTypes = {
  colour: PropTypes.oneOf(orientationTypes).isRequired,
  height: PropTypes.number.isRequired,
}

const mapState = state => ({
  height: state.height / 8,
})

export default connect(mapState)(SparePieces)
