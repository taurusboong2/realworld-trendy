import React from 'react';
import SettingsForm from '../components/Settings/SettingsForm';

const Settings = () => {
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
              <button className="btn btn-outline-danger">Or click here to logout.</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
