import React from 'react';
import SettingsForm from '../components/Form/SettingsForm';
import { useCheckAuth } from '../hooks/auth.hook';
import { useLogout } from '../hooks/auth.hook';

const Settings = () => {
  const { currentUserLogout } = useLogout();
  useCheckAuth();

  const handleLogout = async () => {
    await currentUserLogout();
  };

  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center" style={{ fontSize: '2rem' }}>
                Your Settings
              </h1>

              <SettingsForm />
              <hr />
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
