import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleError } from '@/lib/utils';
import { useForgotPasswordMutation } from '@/redux/api/apiSlice';
import { toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async data => {
    try {
      const res = await forgotPasswordMutation(data).unwrap();
      if (res.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <div className='container mx-auto flex max-w-6xl items-center px-4 py-8 lg:px-0'>
        {/* Right Side - Login Form */}
        <div className='w-full lg:w-1/2 lg:max-w-md mx-auto lg:overflow-visible overflow-hidden'>
          {/* Gradient background with more spread and softer colors */}
          <div className='relative'>
            <div className='absolute -top-32 left-0 w-96 h-96 bg-gradient-to-br from-[#EDBA2B33] to-accent/20 opacity-70 blur-3xl rounded-full' />

            <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#EDBA2B33] via-[#EDBA2B33] to-transparent opacity-70 blur-3xl rounded-full' />
            <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/30 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />

            {/* Card */}
            <div className='bg-white px-[4rem] py-[3rem] rounded-lg shadow-sm space-y-6 relative'>
              <h2 className='text-[2rem] font-bold text-center'>Forgot Password</h2>
              <p className='text-center'>
                Enter your account’s email and we’ll send you an email to reset the password.
              </p>

              <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    id='email'
                    type='text'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email format',
                      },
                    })}
                    className='mt-1 px-4 py-5'
                    placeholder='Email Address'
                  />
                  {errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
                </div>

                <Button type='submit' className='w-full' isLoading={isLoading} loadingText='Sending Email'>
                  Send Email
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
