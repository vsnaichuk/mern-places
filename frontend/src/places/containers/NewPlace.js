import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const NewPlace = () => {
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

    console.log(formState.inputs); // TODO: send this to backend later
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
