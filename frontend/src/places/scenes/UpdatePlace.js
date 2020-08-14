import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  usePlaceById,
  useUpdatePlace,
} from '../../shared/api/hooks/placesHook';
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
  const { placeId } = useParams();
  const { addToast } = useToastContext();

  const [getPlaceData, getLoading, getErrorStatus] = usePlaceById(
    placeId,
  );
  const [
    sendUpdatePlace,
    updPlaceData,
    updLoading,
    updSuccess,
  ] = useUpdatePlace();

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
    if (updSuccess) {
      addToast('success', updPlaceData.message);
    }
  }, [updSuccess, updPlaceData]);

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    await sendUpdatePlace({
      id: placeId,
      body: {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      },
    });
  };

  if (getErrorStatus === 404) {
    return (
      <Card center>
        <h2>Could not find place!</h2>
      </Card>
    );
  }

  if (getLoading) {
    return <Spinner center />;
  }

  return (
    <>
      {getPlaceData?.place && (
        <form className={s.placeForm} onSubmit={submitUpdateHandler}>
          {(updLoading || getLoading) && <Spinner asOverlay />}

          <Input
            id="title"
            el="input"
            type="text"
            label="Title"
            errorText="Please enter a valid name."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initValue={getPlaceData.place.title}
            initValid={true}
          />

          <Input
            id="description"
            el="textarea"
            label="Description"
            errorText="Please enter a valid description (at least 5 characters)."
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initValue={getPlaceData.place.description}
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
