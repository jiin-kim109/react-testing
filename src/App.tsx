import React, { FunctionComponent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetail';

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
} 

const App: FunctionComponent = () => {
  const [buttonColor, setButtonColor] = useState<string>('red');
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <Container>
      <OrderDetailsProvider>
        <button 
          type="button"
          style={{backgroundColor: disabled ? 'gray' : buttonColor}} 
          onClick={() => setButtonColor('blue')}
          disabled={disabled}
        >
          Change to {buttonColor === 'red' ? 'Blue' : 'Red'}
        </button>
        <label htmlFor="disable-button-checkbox">Disable button</label>
        <input 
          type="checkbox"
          id="disable-button-checkbox"
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <OrderEntry/>
      </OrderDetailsProvider>
    </Container> 
  )
}

export default App;