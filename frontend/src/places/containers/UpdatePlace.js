import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../shared/api';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const UpdatePlace = () => {
  const { placeId: id } = useParams();
  const { addToast } = useToastContext();
  const [loadedPlace, setLoadedPlace] = useState();

  const [sendGet, getData, getLoading, getError] = useHttpClient();
  const [sendUpdate, updData, updLoading, updError] = useHttpClient();

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
    sendGet(`${apiUrl.USER_PLACES}/${id}`);
  }, [sendGet]);

  useEffect(() => {
    if (getData && !getError) {
      setLoadedPlace(getData.place);
    }
    if (updData && !updError) {
      addToast({
        messageType: 'success',
        content: updData.message,
      });
    }
  }, [getData, updData, getError, updError, addToast]);

  const submitUpdateHandler = (e) => {
    e.preventDefault();

    sendUpdate(`${apiUrl.PLACES}/${id}`, 'PATCH', {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    });
  };

  if (getError?.response.status === 404) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (getLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {loadedPlace && (
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
            initValue={loadedPlace.title}
            initValid={true}
          />

          <Input
            id="description"
            el="textarea"
            label="Description"
            errorText="Please enter a valid description (at least 5 characters)."
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initValue={loadedPlace.description}
            initValid={true}
          />

          <Button
            size="big"
            type="submit"
            disabled={!formState.isValid}
          >
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
