import React from 'react';
import EditForm from '../components/Form/EditForm';
import { useCheckAuth } from '../hooks/auth.hook';

const CreatePage = () => {
  useCheckAuth();

  return (
    <>
      <EditForm isCreatePage={true} />
    </>
  );
};

export default CreatePage;
