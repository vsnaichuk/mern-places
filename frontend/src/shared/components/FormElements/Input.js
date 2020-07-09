import cx from 'classnames';
import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import s from './Input.module.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input = ({
  el,
  id,
  label,
  rows,
  errorText,
  validators,
  onInput,
  ...inputProps
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    el === 'input' ? (
      <input
        id={id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        {...inputProps}
      />
    ) : (
      <textarea
        id={id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        rows={rows || 3}
        {...inputProps}
      />
    );

  return (
    <div
      className={cx(s.formControl, {
        [s.formControlInvalid]:
          !inputState.isValid && inputState.isTouched,
      })}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p>{errorText}</p>
      )}
    </div>
  );
};

export default Input;
