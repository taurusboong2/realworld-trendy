import React, { useRef } from 'react';
import MyLink from '../components/common/MyLink';
import { useNavigate } from 'react-router';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passWordInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: login, status, error } = useLogin();

  const loginSubmit = async () => {
    const loginData = {
      user: {
        email: emailInputRef.current?.value as string,
        password: passWordInputRef.current?.value as string,
      },
    };
    await login(loginData);
    navigate('/');
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <>{error}</>;
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

              <form onSubmit={loginSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      ref={emailInputRef}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      ref={passWordInputRef}
                    />
                  </fieldset>

                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit" onClick={loginSubmit}>
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
