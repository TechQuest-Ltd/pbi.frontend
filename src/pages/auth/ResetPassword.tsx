import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleError } from '@/lib/utils';

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async data => {
    try {
      console.log(data);
    } catch (error) {
      handleError(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <h2 className='text-[2rem] font-bold text-center'>Reset Password</h2>
              <p className='text-center'>Enter your account’s new password, you can use it to log in next time.</p>

              <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className='mt-1 px-4 py-5'
                      placeholder='New Password'
                    />
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className=' absolute inset-y-0 right-0 pr-3 flex items-center'
                    >
                      {showPassword ? (
                        <EyeOff size={20} className='text-muted' />
                      ) : (
                        <Eye size={20} className='text-muted' />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
                </div>
                <div>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: 'Confirm Password field is required',
                      })}
                      className='mt-1 px-4 py-5'
                      placeholder='Confirm Password'
                    />
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className=' absolute inset-y-0 right-0 pr-3 flex items-center'
                    >
                      {showPassword ? (
                        <EyeOff size={20} className='text-muted' />
                      ) : (
                        <Eye size={20} className='text-muted' />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className='mt-2 text-sm text-red-600'>{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type='submit' className='w-full'>
                  Reset Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
