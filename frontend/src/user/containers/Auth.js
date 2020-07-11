import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../shared/util/validators';
import s from './Auth.module.scss';

const Auth = (props) => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },

      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  return (
    <Card className={s.auth}>
      <h2 className={s.authTitle}>LOGIN</h2>

      <hr />

      <form className={s.authForm} onSubmit={() => {}}>
        {/*// TODO: Add submit handler*/}
        <Input
          id="email"
          el="input"
          type="text"
          label="Email"
          errorText="Please enter a valid email."
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />

        <Input
          id="password"
          el="input"
          type="text"
          label="Password"
          errorText="Please enter a valid password (at least 7 characters)."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
