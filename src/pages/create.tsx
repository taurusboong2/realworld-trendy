import React from 'react';
import EditForm from '../components/Form/EditForm';
import AuthCheck from '../components/common/AuthCheck';

const CreatePage = () => {
  return (
    <AuthCheck>
      <EditForm isCreatePage={true} />
    </AuthCheck>
  );
};

export default CreatePage;
