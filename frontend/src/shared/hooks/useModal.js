import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return [showModal, toggleModal];
};
