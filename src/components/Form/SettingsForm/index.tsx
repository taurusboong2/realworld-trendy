import React, { FC, useEffect } from 'react';
import { useFetchCurrentUser, useUpdateCurrentUserData } from '../../../hooks/auth.hook';
import { useForm } from 'react-hook-form';
import * as errorMessages from '../../../constants/errorMessages';
import { ErrorMessage } from '../../../commons/errorStyledComponents';
import { UpdateUserData } from '../../../types/auth';
import classnames from 'classnames';

const SettingsForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserData>();
  const formError = errors.user;

  const { data: currentUser, isFetched } = useFetchCurrentUser();
  const { mutate: updateUserData, isLoading } = useUpdateCurrentUserData();

  useEffect(() => {
    if (currentUser && isFetched) {
      reset({
        user: {
          username: currentUser.username,
          image: currentUser.image,
          bio: currentUser.bio,
          email: currentUser.email,
        },
      });
    }
  }, [currentUser]);

  const submitUpdateUser = (register: UpdateUserData) => {
    updateUserData(register);
  };

  return (
    <>
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              {...register('user.image')}
              placeholder="URL of profile picture"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              {...register('user.username')}
              type="text"
              placeholder="Your Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              {...register('user.bio')}
              rows={8}
              placeholder="Short bio about you"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              {...register('user.email')}
              type="text"
              placeholder="Email"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className={classnames('form-control form-control-lg', { is_error: formError?.password })}
              {...register('user.password', {
                required: errorMessages.REQUIRED_message,
                minLength: {
                  value: 4,
                  message: errorMessages.MIN_length_4,
                },
              })}
              type="password"
              placeholder="Password"
              autoComplete="false"
            />
            {formError?.password && <ErrorMessage>{formError.password.message}</ErrorMessage>}
          </fieldset>
          <button
            className={classnames('btn btn-lg btn-primary pull-xs-right', { is_error: formError })}
            onClick={handleSubmit(submitUpdateUser)}
            disabled={isLoading || !!formError}>
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default SettingsForm;
