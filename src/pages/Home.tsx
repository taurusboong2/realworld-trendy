import React from 'react';
import Banner from '../components/Home/Banner';
import Container from '../components/Home/Container';
import { useFetchCurrentUser } from '../hooks/auth.hook';

const Home = () => {
  const onSuccess = data => {
    console.log('Perform side effect after data fetching');
  };

  const onError = error => {
    console.log('Perform side effect after encounting error');
  };

  const { data } = useFetchCurrentUser(onSuccess, onError);

  console.log(data);
  return (
    <div className="home-page">
      <>
        <Banner />
        <Container />
      </>
    </div>
  );
};

export default Home;
