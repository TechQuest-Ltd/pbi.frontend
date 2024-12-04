import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyTokenQuery } from '@/redux/api/apiSlice';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const EmailVerificationSuccess = () => {
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
      toast.success('Email Verification Sucessful');
      setVerificationStatus('success');
      navigate('/login');
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
              Your verification token is invalid or expired. <br /> Please try again or request another one.
            </p>
            <Button className='w-full'>Request verification again</Button>
          </div>
        </div>
      </div>
    );
  }

  // Render success state
  return;
};

export default EmailVerificationSuccess;
