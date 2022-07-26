import React from 'react';
import Banner from '../components/Home/Banner';
import Container from '../components/Home/Container';
import { createToast } from '../components/common/Toast';

const Home = () => {
  return (
    <div className="home-page">
      <>
        <button type="button" onClick={() => createToast({ message: '토스트!' })}>
          토스트 생성!
        </button>
        <Banner />
        <Container />
      </>
    </div>
  );
};

export default Home;
