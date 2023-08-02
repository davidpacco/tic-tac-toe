import { useState } from "react"
import confetti from "canvas-confetti"

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      { children }
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (board) => {
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

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

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
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset board</button>
      <section className="game">
        {
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
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{ TURNS.X }</Square>
        <Square isSelected={turn === TURNS.O}>{ TURNS.O }</Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Tie'
                    : 'Winner ' + winner
                }
              </h2>

              <header className="win">
                { winner && <Square>{ winner }</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>New game</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
