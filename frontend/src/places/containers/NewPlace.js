import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import s from './NewPlace.module.scss';

const NewPlace = () => {
  return (
    <form className={s.placeForm}>
      <Input
        el="input"
        type="text"
        label="Name"
        placeholder="Type here name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name"
      />
    </form>
  );
};

export default NewPlace;
