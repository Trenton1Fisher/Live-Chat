import { useState, useEffect, useRef } from 'react'
import { socket } from '../utils/socketConfig'

export default function Message({ user, setUser }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([{}])
  const [roomNumber, setRoomNumebr] = useState()
  const messageContainerRef = useRef(null)

  useEffect(() => {

    socket.on('message_from_server', function(msgObj) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          user: msgObj.user,
          message: msgObj.message,

        },
      ])
    })

    socket.on('send_room_number', function(roomId) {
      setRoomNumebr(roomId)
    })

    return () => {
      socket.off('message_from_server')
      socket.off('send_room_number')
    }
  }, [])


  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }
  }, [messages])

  function handleFormChange(e) {
    setMessage(e.target.value)
  }

  function disconnect() {
    socket.disconnect()
    setUser(prev => ({
      ...prev,
      logged: false,
    }))
  }

  function sendMessage(e) {
    e.preventDefault()

    setMessages(prevMessages => [
      ...prevMessages,
      {
        user: user.username,
        message: message,
      },
    ])
    setMessage('')

    socket.emit('message_from_client', {
      user: user.username,
      message: message,
    }, Number(roomNumber))
  }

  return (
    <div className="message--container">
      <div className="message--navbar">
        <div className="message--users--display">
          <p> Room Id: {roomNumber} </p>
        </div>
        <div className="message--buttons">
          <button className="green--button"></button>
          <button className="yellow--button"></button>
          <button className="red--button" onClick={disconnect}></button>
        </div>
      </div>
      <div className="read--messages--container" ref={messageContainerRef}>
        {messages.length > 0 &&
          messages.map((message, key) => (
            <div key={key} className={
              message.user === user.username
                ? 'sent--message--container'
                : 'recieved--message--container'
            }
            >
              <p className="message--user">{message.user}</p>
              <div
                className={
                  message.user === user.username
                    ? 'sent--message'
                    : 'recieved--message'
                }
              >
                <p className="message--content">{message.message}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="message--sending--container">
        <form onSubmit={sendMessage} className="message--form--container">
          <input
            type="text"
            placeholder="Type Your Message Here"
            className="message--form"
            name="message"
            value={message}
            onChange={handleFormChange}
          />
          <button type="submit" className="message--send--button">
            <img src="/send.png" alt="Send message" />
          </button>
        </form>
      </div>
    </div>
  )
}
