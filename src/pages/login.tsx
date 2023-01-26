import React, { KeyboardEvent } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

import { useErrorToast } from '@/hooks/common.hook';
import { useLogin } from '@/hooks/auth.hook';
import { LoginData } from '@/types';
import { ErrorMessage } from '@/commons/errorStyledComponents';
import { Layout, MyLink } from '@/components/common';
import { createToast } from '@/components/common/Toast';
import { AUTH_Forbidden, REQUIRED_message, loginEmailFormat, WRONG_email, MIN_length_4, ErrorCode } from '@/constants';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const errorUser = errors.user;

  const { mutateAsync: login, isLoading } = useLogin();

  const loginSubmit = async (register: LoginData) => {
    await login(register, {
      onError: error => {
        if (!axios.isAxiosError(error)) {
          throw error;
        }
        const errorStatus = error.response?.status;
        if (errorStatus === ErrorCode.Forbidden)
          createToast({
            message: AUTH_Forbidden,
            type: 'error',
          });
      },
    });
  };

  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(loginSubmit)();
    }
  };

  useErrorToast(errors, '로그인 정보를 다시 확인해주세요.');

  return (
    <Layout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <MyLink href="/register">Need an account?</MyLink>
              </p>

              <form onSubmit={handleSubmit(loginSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: REQUIRED_message,
                        pattern: {
                          value: loginEmailFormat,
                          message: WRONG_email,
                        },
                      })}
                      className={classnames('form-control form-control-lg', { is_error: errorUser?.email })}
                      type="email"
                      placeholder="Email"
                    />
                    {errorUser?.email && <ErrorMessage>{errorUser.email.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', {
                        required: REQUIRED_message,
                        minLength: {
                          value: 4,
                          message: MIN_length_4,
                        },
                      })}
                      className={classnames('form-control form-control-lg', { is_error: errorUser?.password })}
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      onKeyDown={onEnterKeyDown}
                    />
                    {errorUser?.password && <ErrorMessage>{errorUser.password.message}</ErrorMessage>}
                  </fieldset>

                  <button
                    className={classnames('btn btn-lg btn-primary pull-xs-right', { is_error: errorUser })}
                    type="button"
                    onClick={handleSubmit(loginSubmit)}
                    disabled={errorUser || isLoading ? true : false}>
                    {isLoading ? '...' : 'Sign in'}
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

export default Login;
