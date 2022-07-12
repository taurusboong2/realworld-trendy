import React from 'react';
import { useQueryClient } from 'react-query';
import Banner from '../components/Home/Banner';
import Container from '../components/Home/Container';

const Home = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);

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
