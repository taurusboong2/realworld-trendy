import React from 'react';
import Banner from '@/components/Home/Banner';
import Container from '@/components/Home/Container';
import Layout from '@/components/common/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="home-page">
        <>
          <Banner />
          <Container />
        </>
      </div>
    </Layout>
  );
};

export default Home;
