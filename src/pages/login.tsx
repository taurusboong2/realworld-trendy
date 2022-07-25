import React, { KeyboardEvent } from 'react';
import MyLink from '../components/common/MyLink';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types/auth';
import { ErrorMessage, REQUIRED_Msg, ERROR_BORDER, ERROR_BUTTON } from '../commons/errorStyles';

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

              <form onSubmit={handleSubmit(loginSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: REQUIRED_Msg,
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
                        required: REQUIRED_Msg,
                      })}
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      style={errorUser?.password && ERROR_BORDER}
                      onKeyDown={onEnterKeyDown}
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
