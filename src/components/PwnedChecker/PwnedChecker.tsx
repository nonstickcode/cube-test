import React, { useState, useEffect, useRef } from 'react'
import SHA1 from 'crypto-js/sha1'
import './PwnedChecker.css'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PwnedChecker: React.FC = () => {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false) // State to control info modal visibility
  const passwordInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  const checkPassword = () => {
    const hashedPassword = SHA1(password).toString()
    const prefix = hashedPassword.substring(0, 5)
    const suffix = hashedPassword.substring(5).toUpperCase()

    fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split('\n')
        const pwned = lines.some((line) => line.split(':')[0] === suffix)
        if (pwned) {
          setResult('This password has been compromised.')
        } else {
          setResult('This password appears to be safe.')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        setResult('There was an error checking your password.')
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkPassword()
    }
  }

  return (
    <div className="component-container">
      <h1 className="component-title">Password Pwned?</h1>
      <h2 className="component-sub-title" >Check here</h2>

      <button className="info-button" onClick={() => setModalOpen(true)}>
        <FontAwesomeIcon icon={faInfoCircle} /> {/* Correct usage */}
      </button>

      <div className="form-container">
        <input
          className="user-text-input"
          type="password"
          ref={passwordInputRef}
          placeholder="Enter your password here"
          onKeyPress={handleKeyPress}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={checkPassword} className="check-button">
          Check Password
        </button>
        {result && (
          <p
            className="result-text"
            style={{ color: result.includes('compromised') ? 'red' : 'green' }}
          >
            {result}
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>How It Works & Security</h2>
            <p>
              This tool leverages the "Have I Been Pwned" API to determine if a
              password has previously been exposed in data breaches...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PwnedChecker
