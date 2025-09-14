import { useMutation } from '@tanstack/react-query';
import { signup } from '../../api/auth/signup';

interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupParams) => signup(data),
    onSuccess: (response) => {
      console.log('Signup successful:', response);
      // handle post-signup logic here
    },
    onError: (error: any) => {
      console.error('Signup error:', error);
    },
  });
};
