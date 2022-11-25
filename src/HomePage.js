import { customAxios } from './Common/CustomAxios';
import { RESPONSE_BAD_REQ, RESPONSE_OK } from './Common/Response';
import { isExpired } from 'react-jwt';
import Button_set from './Button/Button';

function HomePage() {
  return (
    <>
      <Button_set />
    </>
  );
}

export default HomePage;
