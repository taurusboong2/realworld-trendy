import { createToast } from '@/components/common/Toast';
import { useEffect, useState } from 'react';
import { FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { LoginData } from '@/types/auth';
import { isEmptyObj } from '@/commons/utils';
import { useNavigate } from 'react-router';

export const useErrorToast = (formError: FieldErrorsImpl<DeepRequired<LoginData>>, errorMessage: string) => {
  useEffect(() => {
    if (isEmptyObj(formError)) return;
    if (!isEmptyObj(formError)) {
      createToast({
        message: errorMessage,
        type: 'error',
      });
    }
  }, [formError]);
};

export const useNotFoundRedirect = () => {
  const [second, setSecond] = useState<number>(3);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3400);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond(second - 1);
    }, 1000);

    if (second === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [second]);

  return { second };
};
