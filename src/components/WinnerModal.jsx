import { Square } from "./Square"

// eslint-disable-next-line react/prop-types
export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Tie' : 'Winner ' + winner

  return (
    <section className="winner">
      <div className="text">
        <h2>{ winnerText }</h2>

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