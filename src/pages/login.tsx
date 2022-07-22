import React from 'react';
import MyLink from '../components/common/MyLink';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types/auth';

const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();

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

              <form onSubmit={handleSubmit(loginSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', { required: true })}
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', { required: true })}
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                    />
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
