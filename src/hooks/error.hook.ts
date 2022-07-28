import { createToast } from '@/components/common/Toast';
import { useEffect, useState } from 'react';
import { FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { LoginData } from '@/types/auth';

export const useErrorToast = (formError: FieldErrorsImpl<DeepRequired<LoginData>>, errorMessage: string) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(true);
    if (!error) return;
    if (error) {
      createToast({
        message: errorMessage,
        type: 'error',
      });
    }
    setError(false);
  }, [formError]);
};
