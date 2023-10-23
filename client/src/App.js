import './App.css'
import { useState } from 'react'
import LandingPage from './components/landingPage'
import Message from './components/message'

function App() {
  const [user, setUser] = useState({
    logged: true,
    username: '',
  })

  function handleFormChange(e) {
    setUser(prev => ({
      ...prev,
      username: e.target.value,
    }))
  }

  function handleStateConnection(e) {
    e.preventDefault()
    // When backend is implemented, make sure the connection is stable, but for now, just set the user as logged in
    console.log('connect function called')
    setUser(prev => ({
      ...prev,
      logged: false,
    }))
    console.log(user.logged)
  }

  function handleStateDisconnect() {
    // Implement disconnect logic here
  }

  return (
    <div className="App">
      {user.logged ? (
        <LandingPage
          user={user}
          handleFormChange={handleFormChange}
          handleStateConnection={handleStateConnection}
        />
      ) : (
        <Message />
      )}
    </div>
  )
}

export default App
