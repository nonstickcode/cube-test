import React, { useState, useEffect } from 'react'
import './Generator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Generator: React.FC = () => {
  const [characterAmount, setCharacterAmount] = useState<number>(25)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('password')
  const [showCopyTooltip, setShowCopyTooltip] = useState<boolean>(false)

  useEffect(() => {
    generatePassword()
  }, []) // Dependency array left empty to only run on component mount

  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
  const SYMBOL_CHAR_CODES = [33, 64, 35, 36, 37, 94, 38, 42] // Symbols: !@#$%^&*

  const generatePassword = () => {
    let charCodes = LOWERCASE_CHAR_CODES
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)

    let passwordLength = Math.max(10, Math.min(characterAmount, 50)) // Ensure password length is between 10 and 50 characters

    const passwordCharacters = []
    for (let i = 0; i < passwordLength; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)]
      passwordCharacters.push(String.fromCharCode(characterCode))
    }

    const passwordWithUnderscores = passwordCharacters
      .map((char, index) => (index > 0 && index % 5 === 0 ? `_${char}` : char))
      .join('')

    setPassword(passwordWithUnderscores)
  }

  function arrayFromLowToHigh(low: number, high: number): number[] {
    const array = []
    for (let i = low; i <= high; i++) {
      array.push(i)
    }
    return array
  }

  const syncCharacterAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10)
    setCharacterAmount(value)
  }

  const copyPasswordToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setShowCopyTooltip(true)
      setTimeout(() => setShowCopyTooltip(false), 2000) // Hide tooltip after 2 seconds
    } catch (err) {
      console.error('Failed to copy password: ', err)
    }
  }

  return (
    <div className="component-container">
      <h1 className="component-title">Password Generator</h1>
      <div className="password-display-container">
  <div className="password-display" id="passwordDisplay">
    {password}
  </div>
  <button onClick={copyPasswordToClipboard} className="copy-btn" aria-label="Copy password">
    <FontAwesomeIcon icon={faCopy} />
  </button>
  {showCopyTooltip && <span className="tooltip show">Password copied to clipboard!</span>}
</div>
        
        <div id="passwordGeneratorForm" className="form">
          <label htmlFor="characterAmountSelector">Number of Characters</label>
          <select
            id="characterAmountSelector"
            value={characterAmount}
            onChange={syncCharacterAmount}
          >
            {[...Array(9)].map((_, i) => (
              <option key={i} value={(i + 1) * 5 + 5}>
                {(i + 1) * 5 + 5}
              </option>
            ))}
          </select>

          <label htmlFor="includeUppercase">Include Uppercase</label>
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />

          <label htmlFor="includeNumbers">Include Numbers</label>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />

          <label htmlFor="includeSymbols">Include Symbols</label>
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
        {/* Button outside the form with onClick handler */}
        <button className="component-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    
  )
}

export default Generator
