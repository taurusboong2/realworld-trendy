import { createToast } from '@/components/common/Toast';
import { useEffect } from 'react';
import { FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { LoginData } from '@/types/auth';
import { isEmptyObj } from '@/commons/utils';

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
