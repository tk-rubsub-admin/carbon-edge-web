import { useContext, useState } from 'react';
import axios from 'axios';
import Products from '../../components/Products/Products';
import { authContext } from '../../context/Auth/Auth';
import Spinner from '../../components/Spinner/Spinner';


export default function Home() {

  const { userToken, setUserToken } = useContext(authContext);
  const loginData = { email: 'demo1@demo.com', password: '123456@demo' };

  function handleLogin(data) {
    // axios
    //   .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
    //   .then((data) => {
    //     setUserToken(data.data.token);
    //     localStorage.setItem('authToken', data.data.token);
    //   })
    //   .catch((err) => {
    //   });
    localStorage.setItem('authToken', 'xxxxx');
  }

  if (userToken === null) {
    handleLogin(loginData);
  }

  return (
    <>
      {/* <MainSlider /> */}
      <br /><br />
      {userToken === null ? <Spinner /> : <Products />}
      {/* <CategorySlider /> */}  
    </>
  );
}
