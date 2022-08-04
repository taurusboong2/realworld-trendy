import React, { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import classnames from 'classnames';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCreateNewAccount } from '../hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { NewAccountType } from '../types/auth';
import { ErrorMessage } from '../commons/errorStyledComponents';
import * as messages from '../constants/messages';
import * as regexes from '../constants/regexes';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAccountType>();
  const errorUser = errors.user;

  const { mutate: signUp, status, isLoading } = useCreateNewAccount();

  const submitSignup = async (register: NewAccountType) => {
    await signUp(register);
  };

  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(submitSignup)();
    }
  };

  if (status === 'loading') return <LoadingSpinner />;
  return (
    <Layout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <form onSubmit={handleSubmit(submitSignup)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.username', {
                        required: messages.REQUIRED_message,
                        minLength: {
                          value: 2,
                          message: messages.MIN_length_2,
                        },
                      })}
                      className={classnames('form-control form-control-lg', { is_error: errorUser?.username })}
                      type="text"
                      placeholder="username"
                    />
                    {errorUser?.username && <ErrorMessage>{errorUser?.username.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: messages.REQUIRED_message,
                        pattern: {
                          value: regexes.emailFormat,
                          message: messages.WRONG_email,
                        },
                      })}
                      className={classnames('form-control form-control-lg', { is_error: errorUser?.email })}
                      type="email"
                      placeholder="email"
                    />
                    {errorUser?.email && <ErrorMessage>{errorUser?.email.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', {
                        required: messages.REQUIRED_message,
                        minLength: {
                          value: 4,
                          message: messages.MIN_length_4,
                        },
                      })}
                      className={classnames('form-control form-control-lg', { is_error: errorUser?.password })}
                      type="password"
                      onKeyDown={onEnterKeyDown}
                      placeholder="password"
                    />
                    {errorUser?.password && <ErrorMessage>{errorUser?.password.message}</ErrorMessage>}
                  </fieldset>

                  <button
                    className={classnames('btn btn-lg btn-primary pull-xs-right', { is_error: errorUser })}
                    type="button"
                    onClick={handleSubmit(submitSignup)}
                    disabled={errorUser || isLoading ? true : false}>
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
