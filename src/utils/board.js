import { WINNER_PATTERNS } from "../consts"

export const checkWinner = (board) => {
  for (const pattern of WINNER_PATTERNS) {
    const [a, b, c] = pattern
    if (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return board[a]
    }
  }

  return null
}