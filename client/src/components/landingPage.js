import { socket } from "../utils/socketConfig"
import { useState } from "react"

export default function LandingPage({ user, handleFormChange, handleStateConnection }) {
  const [formChoice, setFormChoice] = useState(0)
  const [roomChoice, setRoomChoice] = useState('')

  function connect() {
    //Can probably pass a param that is an int flag, have to do further testing
    if (formChoice === 0) {
      socket.connect()
      socket.emit('create_room', generateUniqueID())
    }

    else {
      //Call socket.on Join to join a room
      socket.connect();
      socket.emit('connect_to_room', Number(roomChoice))
    }
  }

  function handleRoomStateChange(e) {
    setRoomChoice(e.target.value)
  }


function generateUniqueID() {
  const randomPart = Math.floor(Math.random() * 90000) + 10000;  // Generate a random 5-digit number
  return randomPart;
}


  return (
    <div className="connect--container">
      <div className="connect--form">
        <ul className="connect--nav">
          <li className="connect--nav--option" onClick={() => setFormChoice(1)}>
            <a href="#join-room">Join Room</a>
          </li>
          <li className="connect--nav--option" onClick={() => setFormChoice(0)}>
            <a href="#create-room">Create Room</a>
          </li>
        </ul>
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
          {formChoice === 1 && (
            <input
              type="text"
              className="form--input"
              placeholder="Room Id"
              onChange={handleRoomStateChange}
              name="roomChoice"
              value={roomChoice}
            />
          )}
          <button className="form--button" type="submit" onClick={connect}>Connect +</button>
        </form>
      </div>
    </div>
  )
};

