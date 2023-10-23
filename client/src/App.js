import './App.css'
import { useState, useEffect } from 'react'
import LandingPage from './components/landingPage'
import Message from './components/message'
import { socket } from './utils/socketConfig'

function App() {
	const [user, setUser] = useState({
		logged: false,
		username: '',
	})

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected')
		})
		socket.on('disconnect', () => {
			console.log('Disconnected')
		})

		return () => {
			socket.off('connect')
			socket.off('disconnect')
		}
	}, [])

	function handleFormChange(e) {
		setUser(prev => ({
			...prev,
			username: e.target.value,
		}))
	}

	function handleStateConnection(e) {
		e.preventDefault()
		setUser(prev => ({
			...prev,
			logged: true,
		}))
	}

	return (
		<div className="App">
			{!user.logged ? (
				<LandingPage
					user={user}
					handleFormChange={handleFormChange}
					handleStateConnection={handleStateConnection}
				/>
			) : (
				<Message user={user} setUser={setUser} />
			)}
		</div>
	)
}

export default App
