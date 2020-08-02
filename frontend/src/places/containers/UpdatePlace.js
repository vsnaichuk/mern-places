import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../../shared/api';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useForm } from '../../shared/hooks/formHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const UpdatePlace = () => {
  const { getPlaceById, updatePlace } = apiConfig;
  const { placeId: id } = useParams();
  const { addToast } = useToastContext();

  const [
    { data: getData, loading: getLoading, error: getError },
  ] = useAxios(getPlaceById(id));
  const [
    { data: updData, loading: updLoading, error: updError },
    updPlaceReq,
  ] = useAxios(...updatePlace(id));

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
    },
    false,
  );

  useEffect(() => {
    if (updData && !updError) {
      addToast({
        messageType: 'success',
        content: updData.message,
      });
    }
    if (getError || updError) {
      addToast({
        messageType: 'danger',
        content:
          getError.response?.data ||
          updError.response?.data ||
          'Something went wrong',
      });
    }
  }, [updData, getError, updError, addToast]);

  const submitUpdateHandler = (e) => {
    e.preventDefault();

    updPlaceReq({
      data: {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      },
    });
  };

  if (getLoading && !getData) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  if (!getData && !getError) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className={s.placeForm} onSubmit={submitUpdateHandler}>
      {updLoading && <Spinner asOverlay />}

      <Input
        id="title"
        el="input"
        type="text"
        label="Title"
        errorText="Please enter a valid name."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initValue={getData.place.title}
        initValid={true}
      />

      <Input
        id="description"
        el="textarea"
        label="Description"
        errorText="Please enter a valid description (at least 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initValue={getData.place.description}
        initValid={true}
      />

      <Button size="big" type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
