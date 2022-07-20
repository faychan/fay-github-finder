import React from 'react';

import { Navbar } from '../components/Navbar';
import { Search } from '../components/Search';
import { UserInfo } from '../components/Info';
import { User } from '../components/User';
import { Repos } from '../components/Repos';
import { useModal } from '../components/useModal';
import { ModalReadMe } from '../components/ModalReadMe';

export const Dashboard:React.FC = () => {
  const { isShown, toggle, setContent, modalContent } = useModal();

  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <UserInfo></UserInfo>
      <User></User>
      <Repos toggle={toggle} setContent={setContent}></Repos>
      <ModalReadMe headerText="README" isShown={isShown} hide={toggle} modalContent={modalContent} />
    </main>
  );
};
