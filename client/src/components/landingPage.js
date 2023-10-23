export default function LandingPage({ user, handleFormChange, handleStateConnection }) {
  return (
    <div className="connect--container">
      <div className="connect--form">
        <p>Enter Display Name to Connect</p>
        <form onSubmit={handleStateConnection}>
          <input
            type="text"
            placeholder="Display Name"
            className="form--input"
            name="username"
            value={user.username}
            onChange={handleFormChange}
          />
          <button className="form--button" type="submit" >Connect +</button>
        </form>
      </div>
    </div>
  )
}
