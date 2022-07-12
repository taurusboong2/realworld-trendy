import React from 'react';
import Banner from '../components/Home/Banner';
import Container from '../components/Home/Container';
import { useFetchCurrentUser } from '../hooks/auth.hook';

const Home = () => {
  const { data } = useFetchCurrentUser();
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
