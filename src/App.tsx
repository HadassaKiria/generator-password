import { useState } from 'react'
import { Slider, Checkbox, FormControlLabel } from '@mui/material'
import { CopyIcon } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'

import generator from 'generate-password-browser'
import imageLogo from "./assets/generator-password.jpg"
import './App.css'

function PasswordGenerator(){
  const [value, setValue] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState('');

  const handleChange = (_event: Event, value: number) => {
    setValue(value);
  }

  const generatePassword = () => {
    if(!includeNumbers && !includeSymbols && !includeUppercase && !includeLowercase){
      toast.warn("Selecione pelo menos uma das opções!")
      return;
    }

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
      toast.success("Senha copiada com sucesso!")

    } catch (err) {
      toast.warn("Erro ao copiar senha!")
      return;
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
          </div>
        </div>
      )}

      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default PasswordGenerator