import { ChangeEvent } from 'react';


const getinputNumbersValue = (input: HTMLInputElement) => {
    return input.value.replace(/\D/g, '');
  };

  export const onBackspace = (e: globalThis.KeyboardEvent) => {
    let input = e.target as HTMLInputElement;
    if (e.key === 'Backspace' && getinputNumbersValue(input).length === 1) {
      input.value = '';
    }
  };

  export const onPhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target,
      inputNumbersValue = getinputNumbersValue(input),
      formattedInputValue = '';
    if (!inputNumbersValue) {
      return (input.value = '');
    }

    if (['7', '8', '9'].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = '7' + inputNumbersValue;
      }
      let firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = firstSymbols + ' ';
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  };