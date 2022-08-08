import React, { KeyboardEvent } from 'react';
import Layout from '@/components/common/Layout';
import MyLink from '../components/common/MyLink';
import classnames from 'classnames';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types/auth';
import { ErrorMessage } from '../commons/errorStyledComponents';
import * as messages from '../constants/messages';
import * as regexes from '../constants/regexes';
import { useErrorToast } from '@/hooks/common.hook';
import axios from 'axios';
import { createToast } from '@/components/common/Toast';
import { ErrorCode } from '@/constants/errorCodes';

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
            message: messages.AUTH_Forbidden,
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
                <MyLink href="/signUp">Need an account?</MyLink>
              </p>

              <form onSubmit={handleSubmit(loginSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: messages.REQUIRED_message,
                        pattern: {
                          value: regexes.loginEmailFormat,
                          message: messages.WRONG_email,
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
                        required: messages.REQUIRED_message,
                        minLength: {
                          value: 4,
                          message: messages.MIN_length_4,
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
