// Generator.tsx
import React, { useState, useEffect } from 'react';
import './Generator.css'


const Generator: React.FC = () => {
  const [characterAmount, setCharacterAmount] = useState<number>(10);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('password');

  useEffect(() => {
    generatePassword();
  }, []);

  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
  const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

  const generatePassword = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    setPassword(passwordCharacters.join(''));
  };

  function arrayFromLowToHigh(low: number, high: number): number[] {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  const syncCharacterAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setCharacterAmount(value);
  };

  return (
    <div id='generator-container' className="container">
      <h1 className="title">Password Generator</h1>
      <h3 className="password-display" id="passwordDisplay">{password}</h3>
      <form id="passwordGeneratorForm" className="form" onSubmit={generatePassword}>
        <label htmlFor="characterAmountNumber">Number of Characters</label>
        <div className="character-amount-container">
          <input type="range" min="1" max="50" value={characterAmount} onChange={syncCharacterAmount} id="characterAmountRange" />
          <input type="number" className="number-input" min="1" max="50" value={characterAmount} onChange={syncCharacterAmount} id="characterAmountNumber" />
        </div>

        <label htmlFor="includeUppercase">Include Uppercase</label>
        <input type="checkbox" id="includeUppercase" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />

        <label htmlFor="includeNumbers">Include Numbers</label>
        <input type="checkbox" id="includeNumbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />

        <label htmlFor="includeSymbols">Include Symbols</label>
        <input type="checkbox" id="includeSymbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />

        <button type="submit" className="btn">Generate Password</button>
      </form>
    </div>
  );
};

export default Generator;
