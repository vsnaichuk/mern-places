import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return [showModal, toggleModal];
};
