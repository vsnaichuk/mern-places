import cx from 'classnames';
import React, { useReducer } from 'react';
import s from './Input.module.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true,
      };

    default:
      return state;
  }
};

const Input = ({ el, id, label, rows, errorText, ...inputProps }) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });

  const changeHandler = (e) => {
    dispatch({ type: 'CHANGE', val: e.target.value });
  };

  const element =
    el === 'input' ? (
      <input
        id={id}
        onChange={changeHandler}
        value={inputState.value}
        {...inputProps}
      />
    ) : (
      <textarea
        id={id}
        onChange={changeHandler}
        value={inputState.value}
        rows={rows || 3}
        {...inputProps}
      />
    );

  return (
    <div
      className={cx(s.formControl, {
        [s.formControlInvalid]: !inputState.isValid,
      })}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
