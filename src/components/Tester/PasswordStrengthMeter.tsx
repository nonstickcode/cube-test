import React, { useState } from 'react'
import './PasswordStrengthMeter.css' // Assuming this is the correct path to your CSS file

interface Weakness {
  message: string
  deduction: number
}

const allPossibleWeaknesses: Weakness[] = [
  { message: 'Your password is too short', deduction: 40 },
  { message: 'Your password has no lowercase characters', deduction: 20 },
  { message: 'Your password has no uppercase characters', deduction: 20 },
  { message: 'Your password has no numbers', deduction: 20 },
  { message: 'Your password has no special characters', deduction: 20 },
  { message: 'Your password has repeat characters', deduction: 10 },
]

const PasswordStrengthMeter: React.FC = () => {
  const [strength, setStrength] = useState<number>(0)
  const [reasons, setReasons] = useState<Weakness[]>(allPossibleWeaknesses)

  const calculatePasswordStrength = (
    password: string
  ): (Weakness | undefined)[] => {
    const weaknesses: (Weakness | undefined)[] = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(
      characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
    )
    weaknesses.push(
      characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
    )
    weaknesses.push(characterTypeWeakness(password, /[0-9]/g, 'numbers'))
    weaknesses.push(
      characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
    )
    weaknesses.push(repeatCharactersWeakness(password))
    return weaknesses.filter(Boolean) // Remove any undefined values
  }

  const updateStrengthMeter = (password: string) => {
    const weaknesses = calculatePasswordStrength(password)
    let newStrength = 100
    const newReasons: Weakness[] = []

    weaknesses.forEach((weakness) => {
      if (weakness) {
        newStrength -= weakness.deduction
        newReasons.push(weakness)
      }
    })

    setStrength(newStrength)
    setReasons(newReasons)
  }

  const lengthWeakness = (password: string): Weakness | undefined => {
    const length = password.length
    if (length <= 5) {
      return { message: 'Your password is too short', deduction: 40 }
    } else if (length <= 10) {
      return { message: 'Your password could be longer', deduction: 15 }
    }
  }

  const characterTypeWeakness = (
    password: string,
    regex: RegExp,
    type: string
  ): Weakness | undefined => {
    const matches = password.match(regex) || []
    if (matches.length === 0) {
      return { message: `Your password has no ${type}`, deduction: 20 }
    } else if (matches.length <= 2) {
      return { message: `Your password could use more ${type}`, deduction: 5 }
    }
  }

  const repeatCharactersWeakness = (password: string): Weakness | undefined => {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
      return {
        message: 'Your password has repeat characters',
        deduction: matches.length * 10,
      }
    }
  }

  return (
    <div className="component-container">
      <h1 className="component-title">Password strength</h1>
      <div className="component-body">
        <div
          className="strength-meter"
          style={{ '--strength': `${strength}%` } as React.CSSProperties}
        ></div>
        <div className="input-wrapper">
          <input
            className="user-text-input"
            id="password-input"
            placeholder="Enter password here"
            type="text"
            autoFocus
            aria-labelledby="password entry field"
            onChange={(e) => updateStrengthMeter(e.target.value)}
          />
        </div>
        <div id="reasons" className="reasons">
          {reasons.map((reason, index) => (
            <div key={index}>{reason.message}</div>
          ))}
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
