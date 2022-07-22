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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { mutateAsync: login, status } = useLogin();

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
                      {...register('user.email', { required: '*필수 항목입니다.' })}
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      style={errors.user?.email && ERROR_BORDER}
                    />
                    {errors.user?.email && <ErrorMessage>{errors.user.email.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', { required: '*필수 항목입니다.' })}
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      style={errors.user?.password && ERROR_BORDER}
                    />
                    {errors.user?.password && <ErrorMessage>{errors.user.password.message}</ErrorMessage>}
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="button"
                    onClick={handleSubmit(loginSubmit)}>
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
