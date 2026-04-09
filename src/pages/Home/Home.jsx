import { useContext } from 'react';
import HomeCategories from '../../components/HomeCategories/HomeCategories';
import Products from '../../components/Products/Products';
import { authContext } from '../../context/Auth/Auth';

export default function Home() {
  useContext(authContext);

  return (
    <>
      <br /><br />
      <HomeCategories />
      <Products />
    </>
  );
}
