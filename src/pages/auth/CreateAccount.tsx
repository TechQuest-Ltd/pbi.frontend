import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { linkedIn } from '@/assets';
import { useState } from 'react';
import { handleError } from '@/lib/utils';
import { useCreateUserMutation } from '@/redux/api/apiSlice';
import { toast } from 'sonner';

const CreateAccount: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({ first_name, last_name, email, phoneNumber, password }) => {
    try {
      const res = await createUser({ first_name, last_name, email, phoneNumber, password, age: 0 }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res?.message);
        navigate('/login');
      }
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
        {/* Left Side */}
        <div className='hidden w-1/2 flex-col space-y-4 lg:flex px-6'>
          <h1 className='text-[3.5rem] font-bold leading-[1.2]'>
            Join the Professional <span>Network.</span>
          </h1>
          <p className='text-[1.25rem] '>
            Connect with like-minded professionals and <span className='block'>unlock new opportunities</span>
          </p>
          <div className='mt-6 flex gap-[48px] items-center'>
            <p className='text-sm '>Already have an account?</p>
            <Button
              variant='ghost'
              className='px-0 text-secondary text-sm font-bold hover:text-secondary/90 hover:bg-transparent flex items-center'
              onClick={() => navigate('/login')}
            >
              <span>Sign In</span>
              <ArrowRight className='w-5 h-5 ml-1' />
            </Button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full lg:w-1/2 lg:max-w-md xl:ml-auto lg:overflow-visible overflow-hidden'>
          {/* Gradient background with more spread and softer colors */}
          <div className='relative'>
            <div className='absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent/5 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />
            <div className='absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-accent/5 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />
            <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#EDBA2B33] via-[#EDBA2B33] to-transparent opacity-70 blur-3xl rounded-full' />
            <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/60 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />

            {/* Card */}
            <div className='bg-white px-[4rem] py-[3rem] rounded-lg shadow-sm space-y-6 relative'>
              <h2 className='text-[2rem] font-bold'>Sign Up</h2>

              <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    id='first_name'
                    type='text'
                    {...register('first_name', {
                      required: 'First Name is required',
                    })}
                    className='mt-1 px-4 py-5'
                    placeholder='First Name'
                  />
                  {errors.first_name && <p className='mt-2 text-sm text-red-600'>{errors.first_name.message}</p>}
                </div>
                <div>
                  <Input
                    id='last_name'
                    type='text'
                    {...register('last_name', {
                      required: 'Last Name is required',
                    })}
                    className='mt-1 px-4 py-5'
                    placeholder='Last Name'
                  />
                  {errors.last_name && <p className='mt-2 text-sm text-red-600'>{errors.last_name.message}</p>}
                </div>
                <div>
                  <Input
                    id='phoneNumber'
                    type='text'
                    {...register('phoneNumber', {
                      required: 'First Name is required',
                    })}
                    className='mt-1 px-4 py-5'
                    placeholder='Phone Number'
                  />
                  {errors.phoneNumber && <p className='mt-2 text-sm text-red-600'>{errors.phoneNumber.message}</p>}
                </div>
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

                <div>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className='mt-1 px-4 py-5'
                      placeholder='Password'
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

                <div className='flex items-center'>
                  <input type='checkbox' id='remember' className='h-4 w-4 rounded border-gray-300' />
                  <label htmlFor='remember' className='ml-2 text-sm '>
                    <Button type='button' variant='link' className='px-0 text-accent'>
                      Terms & Conditions{' '}
                    </Button>{' '}
                    Accepted.
                  </label>
                </div>

                <Button type='submit' className='w-full' isLoading={isLoading} loadingText='Continuing'>
                  Continue
                </Button>
              </form>

              <Button
                variant='link'
                className='w-full font-normal hover:no-underline flex items-center justify-center space-x-2  text-[1rem]'
              >
                <img src={linkedIn} alt='LinkedIn logo' />
                <span className='text-muted'>Continue with LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
