import { useState } from "react";

export default function WeatherInput( {onSearchChange} ) {
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      onSearchChange(value);
    }
    
    return(
      <div>
        <input className='Header-input' placeholder='Type your location here...' onChange={handleChange} value={inputValue}></input>
      </div>
    )
  }