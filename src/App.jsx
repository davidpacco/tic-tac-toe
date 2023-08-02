import { useState } from "react"
import { Square } from "./components/Square"
import { TURNS } from "./consts"
import { checkWinner } from "./utils/board"
import confetti from "canvas-confetti"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    const winnerPlayer = checkWinner(newBoard)
    if (winnerPlayer) {
      setWinner(winnerPlayer)
      confetti()
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset board</button>

      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{ TURNS.X }</Square>
        <Square isSelected={turn === TURNS.O}>{ TURNS.O }</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
