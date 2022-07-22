import React from 'react';
import MyLink from '../components/common/MyLink';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types/auth';
import styled from 'styled-components';

const ERROR_BORDER = {
  borderColor: '#F15E5E',
};

const ERROR_BUTTON = {
  backgroundColor: '#F15E5E',
  borderColor: '#F15E5E',
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const errorUser = errors.user;

  const { mutateAsync: login, status, isLoading } = useLogin();

  const loginSubmit = async (register: LoginData) => {
    await login(register);
  };

  if (status === 'loading') return <LoadingSpinner />;
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

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: '*필수 항목입니다.',
                        pattern: {
                          value: /\S+@\S+/,
                          message: '*이메일 형식이 아닙니다.',
                        },
                      })}
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      style={errorUser?.email && ERROR_BORDER}
                    />
                    {errorUser?.email && <ErrorMessage>{errorUser.email.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', {
                        required: '*필수 항목입니다.',
                      })}
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      style={errorUser?.password && ERROR_BORDER}
                    />
                    {errorUser?.password && <ErrorMessage>{errorUser.password.message}</ErrorMessage>}
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="button"
                    onClick={handleSubmit(loginSubmit)}
                    style={errorUser && ERROR_BUTTON}
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

const ErrorMessage = styled.span`
  color: #f15e5e;
  font-weight: bold;
`;
