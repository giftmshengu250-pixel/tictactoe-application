// -----------------------------------------------------------------------
// leaderboard.js
// Stores online-multiplayer results per player NAME in localStorage.
// (A real global leaderboard needs a backend/database - this is the
// front-end-only version that lives in the player's own browser.)
// Entry shape: { name, wins, losses, draws }
// -----------------------------------------------------------------------
import { readStorage, writeStorage } from './storage'

const KEY = 'ttt:leaderboard'

export function loadLeaderboard() {
  try {
    const list = JSON.parse(readStorage(KEY) || '[]')
    if (!Array.isArray(list)) return []
    // Most wins first; fewer losses breaks ties.
    return list.sort((a, b) => b.wins - a.wins || a.losses - b.losses)
  } catch {
    return []
  }
}

export function recordOnlineResult(name, outcome) {
  // outcome: 'win' | 'loss' | 'draw'
  const list = loadLeaderboard()
  let entry = list.find((e) => e.name === name)
  if (!entry) {
    entry = { name, wins: 0, losses: 0, draws: 0 }
    list.push(entry)
  }
  if (outcome === 'win') entry.wins += 1
  else if (outcome === 'loss') entry.losses += 1
  else entry.draws += 1
  writeStorage(KEY, JSON.stringify(list))
}

export function clearLeaderboard() {
  writeStorage(KEY, '[]')
}
