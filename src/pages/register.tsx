import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCreateNewAccount } from '../hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { NewAccountType } from '../types/auth';
import { ErrorMessage, REQUIRED_Msg, ERROR_BORDER, ERROR_BUTTON } from '../commons/errorStyles';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAccountType>();
  const errorUser = errors.user;

  const { mutate: signUp, error, status, isLoading } = useCreateNewAccount();

  const submitSignup = async (register: NewAccountType) => {
    await signUp(register);
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

              <form onSubmit={handleSubmit(submitSignup)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('user.username', {
                        required: REQUIRED_Msg,
                        minLength: {
                          value: 2,
                          message: '*최소 2글자 이상이어야 합니다.',
                        },
                      })}
                      style={errorUser && ERROR_BORDER}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder={errorUser?.username ? '' : 'username'}
                    />
                    {errorUser?.username && <ErrorMessage>{errorUser?.username.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.email', {
                        required: REQUIRED_Msg,
                        pattern: {
                          value: /\S+\@\S+\.\S/,
                          message: '*이메일 형식에 맞지 않습니다.',
                        },
                      })}
                      className="form-control form-control-lg"
                      type="email"
                      placeholder={errorUser?.email ? '' : 'email'}
                    />
                    {errorUser?.email && <ErrorMessage>{errorUser?.email.message}</ErrorMessage>}
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      {...register('user.password', {
                        required: REQUIRED_Msg,
                        minLength: {
                          value: 4,
                          message: '*최소 4자 이상이어야 합니다.',
                        },
                      })}
                      className="form-control form-control-lg"
                      type="password"
                      placeholder={errorUser?.password ? '' : 'password'}
                    />
                    {errorUser?.password && <ErrorMessage>{errorUser?.password.message}</ErrorMessage>}
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="button"
                    style={errorUser && ERROR_BUTTON}
                    onClick={handleSubmit(submitSignup)}
                    disabled={errorUser || isLoading ? true : false}>
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
