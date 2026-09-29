// ExitScreen.jsx — "Exit / Quit". Browsers usually don't let a web page
// close its own tab, so we show a goodbye screen with a way back in.
export default function ExitScreen({ onReturn }) {
  return (
    <div className="exit-screen">
      <h2>Thanks for playing!</h2>
      <p>You can now close this tab.</p>
      <button className="btn btn--reset" onClick={onReturn}>Return to game</button>
    </div>
  )
}
