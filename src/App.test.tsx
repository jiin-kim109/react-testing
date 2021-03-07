import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

// unit testing
test('button has correct initial color', () => {
    render(<App />);

    // find n element with a role of button and text of 'Change to blue'
    const colorButton = screen.getByRole('button', { name: 'Change to Blue' });

    // epect the background color to be red 
    expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
}); 
 
// functional testing
test('button turns blue when clicked', () => {
    render(<App />);
    const colorButton = screen.getByRole('button', { name: 'Change to Blue'});
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
    expect(colorButton.textContent).toBe('Change to Red'); 
});

test('initial conditions', () => {
    render(<App />);
    // check that the button starts out enabled
    const colorButton = screen.getByRole('button', { name: 'Change to Blue' });
    expect(colorButton).toBeEnabled();
    // check that the checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(colorButton);
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: gray');
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: blue');
});

describe('spaces before camel-case capital letters', () => {
    test('Works for no inner capital letters', () => {
        expect(replaceCamelWithSpaces('Red')).toBe('Red');
    });
    test('Works for one inner capital letter', () => {
        expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
    });
    test('Works for multiple inner capital letters', () => {
        expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    });
});