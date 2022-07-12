import React, { FC, useRef } from 'react';

const SettingsForm: FC = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const bioInput = useRef<HTMLTextAreaElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input className="form-control" type="text" placeholder="URL of profile picture" ref={imageInput} />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Your Name" ref={usernameInput} />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              ref={bioInput}
            />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Email" ref={emailInput} />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              autoComplete="false"
              ref={passwordInput}
            />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
        </fieldset>
      </form>
    </>
  );
};

export default SettingsForm;
