import Square from './Square'
import { useGame } from '../context/GameContext'

// Board.jsx — reads from context via useGame(), stays otherwise dumb.
// It doesn't know HOW moves are made or scored, only WHAT to render.
export default function Board() {
  const { board, makeMove, canPlay, winningLine } = useGame()

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={Boolean(winningLine?.includes(index))}
          // `canPlay` (from context) is false when: the game is over, it's
          // the computer's turn, or it's the opponent's turn online.
          disabled={!canPlay}
          onClick={() => makeMove(index)}
        />
      ))}
    </div>
  )
}
