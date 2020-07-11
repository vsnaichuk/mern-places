import React, { useState } from 'react';
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
  const [isLogin, setIsLogin] = useState(true);

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

  const switchModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <Card className={s.auth}>
        <h2 className={s.authTitle}>
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </h2>

        <hr />

        <form className={s.authForm} onSubmit={() => {}}>
          {/*// TODO: Add submit handler*/}
          {!isLogin && (
            <Input
              id="name"
              el="input"
              type="text"
              label="Name"
              errorText="Please enter a valid name."
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
            />
          )}

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
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </Button>
        </form>
      </Card>

      <Card className={s.switchBox}>
        {isLogin ? 'Do not Register?' : 'Already register?'}
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
