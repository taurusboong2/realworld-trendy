import { useEffect } from 'react';
import { createToast } from '@/components/common/Toast';
import { useNavigate } from 'react-router';

export const useNotFoundRediect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    createToast({ type: 'error', message: 'Not Found Page', duration: 4000 });

    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, []);
};
