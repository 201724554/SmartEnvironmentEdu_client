import { customAxios } from './Common/CustomAxios';
import { RESPONSE_BAD_REQ, RESPONSE_OK } from './Common/Response';
import { isExpired } from 'react-jwt';
import Button_set from './Homepage/Button/Button';
import MainContent from './Homepage/MainContent/MainContent';
import React, {  } from 'react';

function HomePage() {
  return (
    <>
      <Button_set />
      <MainContent />
    
    </>
  );
}

export default HomePage;
