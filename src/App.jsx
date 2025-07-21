import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage'
import DemoPage from './components/DemoPage'
import SmartDeviceConnection from './components/SmartDeviceConnection'
import NoDeviceConnected from './components/NoDeviceConnected'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasSeenDemo, setHasSeenDemo] = useState(false)
  const [hasConnectedDevice, setHasConnectedDevice] = useState(false)
  const [userData, setUserData] = useState(null)
  const [connectedDevice, setConnectedDevice] = useState(null)

  const handleSignUpSuccess = (userData) => {
    try {
      setUserData(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error in sign up success:', error)
    }
  }

  const handleSignInSuccess = (userData) => {
    try {
      setUserData(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error in sign in success:', error)
    }
  }

  const handleSwitchToSignUp = () => {
    try {
      setAuthMode('signup')
    } catch (error) {
      console.error('Error switching to sign up:', error)
    }
  }

  const handleSwitchToSignIn = () => {
    try {
      setAuthMode('signin')
    } catch (error) {
      console.error('Error switching to sign in:', error)
    }
  }

  const handleDemoComplete = () => {
    try {
      setHasSeenDemo(true)
    } catch (error) {
      console.error('Error completing demo:', error)
    }
  }

  const handleDeviceConnected = (device) => {
    try {
      setConnectedDevice(device)
      setHasConnectedDevice(true)
    } catch (error) {
      console.error('Error connecting device:', error)
    }
  }

  const handleContinueWithoutDevice = () => {
    try {
      setHasConnectedDevice(true)
    } catch (error) {
      console.error('Error continuing without device:', error)
    }
  }

  const handleConnectDevice = () => {
    try {
      setHasConnectedDevice('connecting')
    } catch (error) {
      console.error('Error starting device connection:', error)
    }
  }

  const handleSignOut = () => {
    try {
      setIsAuthenticated(false)
      setHasSeenDemo(false)
      setHasConnectedDevice(false)
      setUserData(null)
      setConnectedDevice(null)
      setAuthMode('signin') // Reset to sign in mode
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        authMode === 'signin' ? (
          <SignInPage 
            onSignInSuccess={handleSignInSuccess}
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        ) : (
          <SignUpPage 
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        )
      ) : !hasSeenDemo ? (
        <DemoPage onComplete={handleDemoComplete} />
      ) : !hasConnectedDevice ? (
        <NoDeviceConnected 
          onConnectDevice={handleConnectDevice}
          onContinueWithout={handleContinueWithoutDevice}
        />
      ) : hasConnectedDevice === 'connecting' ? (
        <SmartDeviceConnection 
          onDeviceConnected={handleDeviceConnected}
          onSkip={handleContinueWithoutDevice}
        />
      ) : (
        <Dashboard 
          onSignOut={handleSignOut} 
          userData={userData}
          connectedDevice={connectedDevice}
        />
      )}
    </ThemeProvider>
  )
}

export default App
