import React, { FC, useEffect, useRef } from 'react';
import { useFetchCurrentUser, useUpdateCurrentUserData } from '../../../hooks/auth.hook';

const SettingsForm: FC = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const bioInput = useRef<HTMLTextAreaElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const { data: currentUser } = useFetchCurrentUser();
  const { mutate: updateUserData, isLoading } = useUpdateCurrentUserData();

  useEffect(() => {
    if (currentUser) {
      if (typeof window !== 'undefined') {
        imageInput.current!.value = currentUser!.image as string;
        usernameInput.current!.value = currentUser!.username as string;
        emailInput.current!.value = currentUser!.email as string;
      }
    }
  }, [usernameInput.current]);

  const submitUpdateUser = () => {
    const newData = {
      user: {
        username: usernameInput.current?.value as string,
        email: emailInput.current?.value as string,
        bio: bioInput.current?.value as string,
        image: imageInput.current?.value as string,
        password: passwordInput.current?.value as string,
      },
    };
    updateUserData(newData);
  };

  return (
    <>
      <form onSubmit={submitUpdateUser}>
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
          <button className="btn btn-lg btn-primary pull-xs-right" onClick={submitUpdateUser} disabled={isLoading}>
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default SettingsForm;
