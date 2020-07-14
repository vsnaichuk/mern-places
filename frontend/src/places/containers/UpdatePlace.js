import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import s from './PlaceForm.module.scss';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Museum of Contemporary Art Australia',
    description:
      'The Museum of Contemporary Art Australia (abbreviated MCA), located in George Street, Sydney, is an Australian museum solely dedicated to exhibiting, interpreting and collecting contemporary art, both from across Australia and around the world.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MCA_Sydney.jpg/800px-MCA_Sydney.jpg',
    address: '140 George St, The Rocks NSW 2000, Australia',
    location: {
      lat: -33.8599358,
      lng: 151.2090295,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg',
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u2',
  },
  {
    id: 'p3',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg',
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u1',
  },
];

const UpdatePlace = (props) => {
  const { placeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
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

  const identifiedPlace = DUMMY_PLACES.find(
    (place) => place.id === placeId,
  );

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },

          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true,
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  const { inputs } = formState;

  return (
    <form className={s.placeForm} onSubmit={() => {}}>
      {/*// TODO: Add submit handler*/}
      <Input
        id="title"
        el="input"
        type="text"
        label="Title"
        errorText="Please enter a valid name."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initValue={inputs.title.value}
        initValid={inputs.title.isValid}
      />

      <Input
        id="description"
        el="textarea"
        label="Description"
        errorText="Please enter a valid description (at least 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initValue={inputs.description.value}
        initValid={inputs.description.isValid}
      />

      <Button size="big" type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
