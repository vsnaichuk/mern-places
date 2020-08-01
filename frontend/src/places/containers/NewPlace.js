import useAxios from 'axios-hooks';
import React from 'react';
import { config } from '../../shared/api/Api';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/formHook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const NewPlace = () => {
  const [{ loading, error, data }, createReq] = useAxios(
    ...config.newPlace(),
  );

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

  const submitPlaceHandler = (e) => {
    e.preventDefault();

    createReq({
      data: {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
      },
    });
  };

  return (
    <form className={s.placeForm} onSubmit={submitPlaceHandler}>
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
