import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './NewPlace.module.scss';

const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {},
  []);
  const descrInputHandler = useCallback((id, value, isValid) => {},
  []);

  return (
    <form className={s.placeForm}>
      <Input
        el="input"
        type="text"
        label="Title"
        placeholder="Type here title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={titleInputHandler}
      />

      <Input
        el="textarea"
        label="Description"
        placeholder="Type here description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={descrInputHandler}
      />
    </form>
  );
};

export default NewPlace;
