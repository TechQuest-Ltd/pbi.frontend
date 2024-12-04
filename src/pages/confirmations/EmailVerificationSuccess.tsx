import { logo } from '@/assets';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyTokenQuery } from '@/redux/api/apiSlice';
import { Loader2 } from 'lucide-react';

const EmailVerificationSuccess = () => {
  const [countdown, setCountdown] = useState(120);
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const { verificationToken } = useParams();

  const navigate = useNavigate();

  // Use the verification token query
  const { isSuccess, isError } = useVerifyTokenQuery(verificationToken, {
    skip: !verificationToken,
  });

  // Effect to handle verification and countdown
  useEffect(() => {
    // Check verification status
    if (isSuccess) {
      setVerificationStatus('success');

      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            navigate('/login');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (isError) {
      setVerificationStatus('error');
    }
  }, [isSuccess, isError, navigate]);

  // Render loading state
  if (verificationStatus === 'loading') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background relative overflow-hidden'>
        <div className='text-center'>
          <Loader2 className='mx-auto animate-spin text-orange-500' size={48} />
          <p className='mt-4 text-lg text-gray-600'>Verifying email...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (verificationStatus === 'error') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background relative overflow-hidden'>
        <div className='w-full max-w-md text-center relative z-10 px-4'>
          <div className='bg-white p-8 rounded-lg shadow-sm space-y-4'>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>
              Email Verification Failed
            </h2>
            <p className='text-base text-red-600 mb-4'>
              There was an issue verifying your email. Please try again or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render success state
  return (
    <div className='flex min-h-screen items-center justify-center bg-background relative overflow-hidden'>
      <div className='absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent/5 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />
      <div className='absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-accent/5 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />
      <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#EDBA2B33] via-[#EDBA2B33] to-transparent opacity-70 blur-3xl rounded-full' />
      <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/20 via-accent/5 to-transparent opacity-70 blur-3xl rounded-full' />

      <div className='w-full max-w-md text-center relative z-10 px-4'>
        {/* Logo */}
        <div className='flex justify-center mb-4'>
          <img src={logo} alt='PBI Logo' className='w-24 h-auto' />
        </div>

        {/* Card */}
        <div className='bg-white p-8 rounded-lg shadow-sm space-y-4'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>
            Email Verified Successfully
          </h2>

          <p className='text-base text-gray-600 mb-4'>
            Your email has been successfully verified. You can now log in to your account.
          </p>

          {/* Redirect Counter */}
          <div className='bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent p-2 rounded-lg text-center'>
            <p className='font-semibold'>Redirecting to login in {countdown} seconds</p>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center text-gray-500 mt-4 text-sm'>
          <p>© {new Date().getFullYear()}, PBI, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
