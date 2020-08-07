import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import { useCreatePlace } from '../../shared/api/hooks/placesHook';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useAuthContext } from '../../shared/hooks/authHook';
import { useForm } from '../../shared/hooks/formHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const NewPlace = () => {
  const { push } = useHistory();
  const { userId } = useAuthContext();
  const { addToast } = useToastContext();
  const [
    sendCreatePlace,
    data,
    isLoading,
    isSuccess,
    error,
    errMessage,
  ] = useCreatePlace();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },

      description: {
        value: '',
        isValid: false,
      },

      address: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    if (isSuccess) {
      push(routes.HOME);
      addToast('success', data.message);
    }
    if (error) {
      addToast('danger', errMessage || 'Something went wrong');
    }
  }, [isSuccess, error]);

  const submitPlaceHandler = (e) => {
    e.preventDefault();

    sendCreatePlace({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: userId,
    });
  };

  return (
    <form className={s.placeForm} onSubmit={submitPlaceHandler}>
      {isLoading && <Spinner asOverlay />}

      <Input
        id="title"
        el="input"
        type="text"
        label="Title"
        placeholder="Type here title"
        errorText="Please enter a valid name."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />

      <Input
        id="description"
        el="textarea"
        label="Description"
        placeholder="Type here description"
        errorText="Please enter a valid description (at least 5 characters)."
        rows={10}
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />

      <Input
        id="address"
        el="input"
        label="Address"
        placeholder="Type here address"
        errorText="Please enter a valid address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />

      <Button size="big" type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
