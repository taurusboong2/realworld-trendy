import { createToast } from '@/components/common/Toast';
import { useEffect, useState } from 'react';

export const useErrorToast = formError => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(true);
    if (!error) return;
    if (error) {
      createToast({
        message: '로그인 정보를 확인해주세요.',
        type: 'error',
      });
    }
    setError(false);
  }, [formError]);
};
