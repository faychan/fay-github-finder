import { useState } from 'react';

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [modalContent, setContent] = useState<string>("");
  const toggle = () => setIsShown(!isShown);
  return {
    isShown,
    toggle,
    setContent,
    modalContent,
  };
};