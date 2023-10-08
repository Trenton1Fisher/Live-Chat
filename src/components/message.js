import { useState } from 'react'

export default function Message() {
  const [usersConnected, setUsersConnectd] = useState(1)
  const [message, setMessage] = useState('')

  function handleFormChange(event) {
    const { value } = event.target
    setMessage(value)
    console.log(message)
  }

  return (
    <div className="message--container">
      <div className="message--navbar">
        <div className="message--users--display">
          <img src="/user.png" alt="Users Connected" className="user--image" />
          <p>{usersConnected}</p>
        </div>
        <div className="message--buttons">
          <div className="green--button"></div>
          <div className="yellow--button"></div>
          <div className="red--button"></div>
        </div>
      </div>
      <div className="message--sending--container">
        <form action="" className="message--form--container">
          <input
            type="text"
            placeholder="Type Your Message Here"
            className="message--form"
            name="message"
            value={message}
            onChange={handleFormChange}
          />
          <button className="message--send--button">
            <img src="/send.png" alt="Send message" />
          </button>
        </form>
      </div>
    </div>
  )
}
