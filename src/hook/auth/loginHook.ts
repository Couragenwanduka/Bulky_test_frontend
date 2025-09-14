import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth/login';

interface loginParams {
    email: string;
    password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: loginParams) => login(data),
    onSuccess: (response) => {
      console.log('Signup successful:', response);
      // handle post-signup logic here
    },
    onError: (error: any) => {
      console.error('Signup error:', error);
    },
  });
};
