import React, { useState } from 'react';
import './App.css';

// Function to compute modular inverse
function modInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return 1;
}

// Function to encrypt text using Affine Cipher
function encrypt(text, keyA, keyB) {
  const result = [];
  const m = 26; // Size of the alphabet

  const parsedKeyA = parseInt(keyA, 10);
  const parsedKeyB = parseInt(keyB, 10);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const isUpperCase = char === char.toUpperCase();
      const asciiOffset = isUpperCase ? 65 : 97;
      const x = char.charCodeAt(0) - asciiOffset;
      const encryptedChar = String.fromCharCode(((parsedKeyA * x + parsedKeyB) % m) + asciiOffset);
      result.push(encryptedChar);
    } else {
      result.push(char);
    }
  }

  return result.join('');
}

// Function to decrypt text using Affine Cipher
function decrypt(text, keyA, keyB) {
  const result = [];
  const m = 26; // Size of the alphabet
  const parsedKeyA = parseInt(keyA, 10);
  const parsedKeyB = parseInt(keyB, 10);
  const keyAInverse = modInverse(parsedKeyA, m);

  

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const isUpperCase = char === char.toUpperCase();
      const asciiOffset = isUpperCase ? 65 : 97;
      const x = char.charCodeAt(0) - asciiOffset;
      const decryptedChar = String.fromCharCode(((keyAInverse * (x - parsedKeyB + m)) % m) + asciiOffset);
      result.push(decryptedChar);
    } else {
      result.push(char);
    }
  }

  return result.join('');
}

function App() {
  const [inputText, setInputText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [keyA, setKeyA] = useState(5);
  const [keyB, setKeyB] = useState(8);
  const [encryptedResult, setEncryptedResult] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');

  const handleEncrypt = () => {
    const result = encrypt(inputText, keyA, keyB);
    setEncryptedResult(result);
  };

  const handleDecrypt = () => {
    const result = decrypt(cipherText, keyA, keyB);
    setDecryptedResult(result);
  };

  return (
    <div>
      <header>
          <div className='HeaderTitle'>
            <span>Affine</span> Cipher
          </div>
        </header>
      <div className="App">
        <div className="KeyContainer">
          <label>
            Key A:
            <input type="number" value={keyA} onChange={(e) => setKeyA(e.target.value)} className='KeyInput' />
          </label>
          <label>
            Key B:
            <input type="number" value={keyB} onChange={(e) => setKeyB(e.target.value)} className='KeyInput' />
          </label>
        </div>
        <div className='RowContainer'>
          <div className="EncryptContainer">
            <div className='SectionTitle'>Encryption</div>
            <label>
              Encrypt some text :
              <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
            </label>
            <button onClick={handleEncrypt}>Encrypt</button>
            {encryptedResult !== "" && (
              <div className='ResultBox'>
                <label>Encrypted Result: {encryptedResult}</label>
              </div>
            )}
          </div>
          <div className="DecryptContainer">
            <div className='SectionTitle'>Decryption</div>
            <label>
              Decrypt some text :
              <textarea value={cipherText} onChange={(e) => setCipherText(e.target.value)} />
            </label>
            <button onClick={handleDecrypt}>Decrypt</button>
            {decryptedResult !== "" && (
              <div className='ResultBox'>
                <label>Decrypted Result: {decryptedResult}</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
