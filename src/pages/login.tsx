import React, { KeyboardEvent } from 'react';
import MyLink from '../components/common/MyLink/MyLink';
import classnames from 'classnames';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types/auth';
import { ErrorMessage } from '../commons/errorStyledComponents';
import * as errorMessages from '../constants/errorMessages';
import * as regexes from '../constants/regexes';
import { createToast } from '@/components/common/Toast';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const errorUser = errors.user;

  const { mutateAsync: login, isLoading } = useLogin();

  const loginSubmit = async (register: LoginData) => {
    await login(register);
  };

  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(loginSubmit)();
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <MyLink href="/signUp">Need an account?</MyLink>
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => createToast({ message: '로그인에 성공하셨습니다.', type: 'info' })}>
                  토스트 생성
                </button>
              </div>

              <form onSubmit={handleSubmit(loginSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: errorMessages.REQUIRED_message,
                        pattern: {
                          value: regexes.loginEmailFormat,
                          message: errorMessages.WRONG_email,
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
                        required: errorMessages.REQUIRED_message,
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
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
