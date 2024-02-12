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
      <button className="info-button" onClick={() => setModalOpen(true)}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      <h1 className="component-title">Password Pwned?</h1>
      <h2 className="component-sub-title">Check here</h2>
      <div className="component-body">
        <div className="form-container">
          <input
            className="user-text-input"
            type="password"
            ref={passwordInputRef}
            placeholder="Enter password here"
            onKeyPress={handleKeyPress}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={checkPassword} className="component-btn">
            Check Password
          </button>
          {result && (
            <p
              className="result-text"
              style={{
                color: result.includes('compromised') ? 'red' : 'green',
              }}
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
                This tool securely checks if a password has been exposed in any
                data breaches by utilizing the "Have I Been Pwned" API. To
                ensure maximum security and privacy, the password you enter is
                never sent or stored in its entirety. Instead, the app first
                encrypts your password locally using the SHA-1 hashing
                algorithm. Only the first five characters of the hashed version
                are sent to the API. This partial hash allows the service to
                return a list of matching hash prefixes without ever knowing
                your actual password or the full hash. When the list is
                received, the app then checks locally, on your device, if the
                rest of your hashed password matches any of the returned hashes.
                This process ensures that the complete hashed password, let
                alone the password itself, is never transmitted or exposed,
                maintaining your privacy and security. By leveraging this
                k-anonymity model, the tool provides a safe way to check if your
                password is compromised, without compromising your password's
                security.
              </p>

              <a
                href="https://haveibeenpwned.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://haveibeenpwned.com
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PwnedChecker
