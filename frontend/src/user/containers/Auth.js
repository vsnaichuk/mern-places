import React, { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import s from './Auth.module.scss';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
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
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },

        formState.inputs.email.isValid &&
          formState.inputs.password.value,
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },

        false,
      );
    }

    setIsLoginMode((prev) => !prev);
  };

  return (
    <>
      <Card className={s.auth}>
        <h2 className={s.authTitle}>
          {isLoginMode ? 'LOGIN' : 'REGISTER'}
        </h2>

        <hr />

        <form className={s.authForm} onSubmit={() => {}}>
          {/*// TODO: Add submit handler*/}
          {!isLoginMode && (
            <Input
              id="name"
              el="input"
              type="text"
              label="Name"
              errorText="Please enter a valid name."
              validators={[VALIDATOR_REQUIRE()]}
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

          <Button
            size="big"
            type="submit"
            disabled={!formState.isValid}
          >
            {isLoginMode ? 'LOGIN' : 'REGISTER'}
          </Button>
        </form>
      </Card>

      <Card className={s.switchBox}>
        <h4>
          {isLoginMode ? 'Do not Register?' : 'Already register?'}
        </h4>

        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'Register' : 'Login'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
