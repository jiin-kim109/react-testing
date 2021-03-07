import React, { FunctionComponent, useState } from 'react';

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
} 

const App: FunctionComponent = () => {
  const [buttonColor, setButtonColor] = useState<string>('red');
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div>
      <button 
        style={{backgroundColor: disabled ? 'gray' : buttonColor}} 
        onClick={() => setButtonColor('blue')}
        disabled={disabled}
      >
Change to
{buttonColor === 'red' ? 'Blue' : 'Red'}
      </button>
      <input 
        type="checkbox"
        id="disable-button-checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div> 
  )
}

export default App;