import { useState } from 'react'
import { useGame } from '../context/GameContext'

// PlayerNameForm.jsx — lets players type their own names in place of
// raw "X" / "O". Local input state is fine here (it's just a form draft)
// — only on submit do we dispatch into the reducer via setPlayerNames().
export default function PlayerNameForm() {
  const { playerNames, setPlayerNames, mode, online } = useGame()
  const [xDraft, setXDraft] = useState(playerNames.X)
  const [oDraft, setODraft] = useState(playerNames.O)

  // Which name fields can be edited in the current mode?
  //  - solo: O is the computer, so only X (you)
  //  - online: only MY symbol's name (the opponent sends theirs)
  const xLocked = mode === 'online' && online.mySymbol === 'O'
  const oLocked = mode === 'solo' || (mode === 'online' && online.mySymbol === 'X')

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlayerNames(xDraft, oDraft)
  }

  return (
    <form className="name-form" onSubmit={handleSubmit}>
      <div className="name-form__field">
        <label htmlFor="playerX">Player X</label>
        <input id="playerX" type="text" maxLength={14} value={xDraft} disabled={xLocked}
          onChange={(e) => setXDraft(e.target.value)} placeholder="Player X" />
      </div>
      <div className="name-form__field">
        <label htmlFor="playerO">Player O</label>
        <input id="playerO" type="text" maxLength={14} value={oDraft} disabled={oLocked}
          onChange={(e) => setODraft(e.target.value)} placeholder="Player O" />
      </div>
      <button type="submit" className="btn btn--ghost">Save Names</button>
      {mode === 'online' && <p className="hint">Names are shared when the room connects.</p>}
    </form>
  )
}
