import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCreateNewAccount } from '../hooks/auth.hook';

const Register = () => {
  const navigate = useNavigate();
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passWordInputRef = useRef<HTMLInputElement>(null);

  const { mutate: signUp, error, status, isLoading, data } = useCreateNewAccount();

  const submitSignup = () => {
    const newAccountData = {
      user: {
        username: userNameInputRef.current?.value as string,
        email: emailInputRef.current?.value as string,
        password: passWordInputRef.current?.value as string,
      },
    };
    signUp(newAccountData);
    if (status === 'success') {
      alert('회원가입이 성공적으로 진행되었습니다.');
      navigate('/');
    }
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <>{error}</>;
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <form onSubmit={submitSignup}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      ref={userNameInputRef}
                    />
                  </fieldset>

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
                      placeholder="Password"
                      ref={passWordInputRef}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    onClick={submitSignup}
                    disabled={isLoading}>
                    Sign up
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

export default Register;
