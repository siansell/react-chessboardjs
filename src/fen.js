export const fenConstants = {
  start: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  empty: '8/8/8/8/8/8/8/8',
}

export const compressEmptySquares = fen => fen.replace(/([1|.]+)/g, (c, p) => p.length.toString())
export const expandEmptySquares = fen => fen.replace(/(\d)/g, (_, p) => '1'.repeat(p))
export const removeExtraFenInfo = fen => (fen.indexOf(' ') > -1 ? fen.substring(0, fen.indexOf(' ')) : fen)

export const replaceFenConstants = (fen) => {
  let newFen = fen
  Object.keys(fenConstants).forEach((key) => {
    newFen = newFen.replace(key, fenConstants[key])
  })
  return newFen
}

export const getFenParts = (fen) => {
  const fenReplaced = replaceFenConstants(fen)
  return expandEmptySquares(removeExtraFenInfo(fenReplaced))
    .split('/')
}

export const makeMove = (fen, piece, fromSquare, toSquare) => {
  // update the fen
  const fenParts = getFenParts(fen)

  // remove the piece from the fromSquare
  const fromSquareFile = fromSquare.charCodeAt(0) - 97
  const fromSquareRank = Math.abs(parseInt(fromSquare.charAt(1), 10) - 1 - 7)
  fenParts[fromSquareRank] = fenParts[fromSquareRank]
    .replace(/./g, (c, i) => ((i === fromSquareFile) ? '1' : c))

  // put the piece on the toSquare
  // toSquare will be null if dropOffBoard is true and the piece was dragged off the board
  if (toSquare) {
    const toSquareFile = toSquare.charCodeAt(0) - 97
    const toSquareRank = Math.abs(parseInt(toSquare.charAt(1), 10) - 1 - 7)
    fenParts[toSquareRank] = fenParts[toSquareRank]
      .replace(/./g, (c, i) => ((i === toSquareFile) ? piece : c))
  }

  const newFen = fenParts.join('/')
  return compressEmptySquares(removeExtraFenInfo(newFen))
}
