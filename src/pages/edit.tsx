import React from 'react';
import EditForm from '../components/Form/EditForm';
import Layout from '@/components/common/Layout';

const EditPage = () => {
  return (
    <Layout>
      <EditForm isCreatePage={false} />
    </Layout>
  );
};

export default EditPage;
