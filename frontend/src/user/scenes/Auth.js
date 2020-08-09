import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../shared/api/hooks/authHook';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useAuthContext } from '../../shared/hooks/authHook';
import { useForm } from '../../shared/hooks/formHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import s from './Auth.module.scss';

const Auth = () => {
  const { addToast } = useToastContext();
  const { login } = useAuthContext();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [
    sendAuth,
    data,
    isLoading,
    isSuccess,
    error,
    errMessage,
  ] = useUserAuth();

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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },

        false,
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      login(data.user.id);
      addToast('success', data.message);
    }
    if (error) {
      addToast('danger', errMessage || 'Something went wrong');
    }
  }, [isSuccess, error, data]);

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      await sendAuth({
        login: true,
        body: {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        },
      });
    } else {
      const formData = new FormData();

      formData.append('name', formState.inputs.name.value);
      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('image', formState.inputs.image.value);

      await sendAuth({
        body: formData,
      });
    }
  };

  return (
    <>
      <Card className={s.auth}>
        {isLoading && <Spinner asOverlay />}

        <h2 className={s.authTitle}>
          {isLoginMode ? 'LOGIN' : 'REGISTER'}
        </h2>

        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <div className={s.row}>
              <Input
                id="name"
                el="input"
                type="text"
                label="Name"
                className={s.authName}
                errorText="Please enter a valid name."
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />

              <ImageUpload
                id="image"
                onInput={inputHandler}
                style={{ width: '13rem' }}
                center
              />
            </div>
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
