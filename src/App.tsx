import { useState } from 'react'
import { Slider, Checkbox, FormControlLabel } from '@mui/material'
import generator from 'generate-password-browser'
import { CopyIcon } from 'lucide-react'

import imageLogo from "./assets/generator-password.jpg"
import './App.css'

function PasswordGenerator(){
  const [value, setValue] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (_event: Event, value: number) => {
    setValue(value);
  }

  const generatePassword = () => {
    const newPassword = generator.generate({
    length: value,
    numbers: includeNumbers,
    symbols: includeSymbols,
    uppercase: includeUppercase,
    lowercase: includeLowercase,
    strict: true
  });

  setPassword(newPassword)
}

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (err) {
      console.log('Erro ao copiar senha', err)
    }
  }

  return(
    <div className="container">
      <img src={imageLogo} alt="Logo" className="logo"/>
      <h1 className='title'>Gerador de senhas</h1>

      <label>Quantidade de caracteres: {value}</label>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby='continuous-slider'
        min={8}
        max={50}
        size="medium"
        sx={{ width: '300px'}}
      />

      <div className='checkboxGrid'>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              size="small"
              sx={{
                color: '#ddd',
              }}
            />
          }
          label="Números"
        />

        <FormControlLabel
          control={
            <Checkbox 
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              size="small"
              sx={{
                color: '#ddd',
              }}
            />
          }
          label="Letras maiúsculas"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              size="small"
              sx={{
                color: '#ddd',
              }}
            />
          }
          label="Simbolos"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              size="small"
              sx={{
                color: '#ddd',
              }}
            />
          }
          label="Letras minúsculas"
        />
      </div>

      <button className="button" onClick={generatePassword}>Gerar Senha</button>

      {password && (
        <div className='containerPassword'>
          <label>Senha gerada:</label>
          <div className='password'>
            {password}
            <button className='buttonIcon' onClick={copyPassword}>
              <CopyIcon className='icon'/>
            </button>

            {copied && <span className='copiedMessage'>Senha Copiada!</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordGenerator