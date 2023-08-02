import { Square } from "./Square"

export function Board ({ board, updateBoard }) {
  return (
    board.map((value, index) => {
      return (
        <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
        >
          { value }
        </Square>
      )
    })
  )
}