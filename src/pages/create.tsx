import React from 'react';
import EditForm from '../components/Form/EditForm';
import { useCheckAuth } from '../hooks/auth.hook';
import Layout from '@/components/common/Layout';

const CreatePage = () => {
  useCheckAuth();

  return (
    <Layout>
      <EditForm isCreatePage={true} />
    </Layout>
  );
};

export default CreatePage;
