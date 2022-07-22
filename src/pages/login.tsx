import React, { useRef } from 'react';
import MyLink from '../components/common/MyLink';
import { useLogin } from '../hooks/auth.hook';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, watch } = useForm();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passWordInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: login, status } = useLogin();

  // const loginSubmit = async () => {
  //   const loginData = {
  //     user: {
  //       email: emailInputRef.current?.value as string,
  //       password: passWordInputRef.current?.value as string,
  //     },
  //   };
  //   await login(loginData);
  // };

  const onSubmit = data => console.log(data);

  console.log(`email watch`, watch('emailRef'));
  console.log(`password watch`, watch('passwordRef'));

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

              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...(register('emailRef'),
                      {
                        required: true,
                      })}
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      ref={emailInputRef}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...(register('passwordRef'),
                      {
                        required: true,
                      })}
                      className="form-control form-control-lg"
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      ref={passWordInputRef}
                    />
                  </fieldset>

                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
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
