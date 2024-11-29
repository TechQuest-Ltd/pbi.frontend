import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useCreateUserProfileMutation } from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/lib/utils';

interface ProfileFormInputs {
  nationality: string;
  address: string;
  bio: string;
  sectors: { value: string; label: string }[];
  preferredSectors: { value: string; label: string }[];
}

const sectorOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Education', label: 'Education' },
  { value: 'Healthcare', label: 'Healthcare' },
];

const CreateProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormInputs>();
  const [createUserProfile, { isLoading }] = useCreateUserProfileMutation();
  const { user } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProfileFormInputs> = async ({
    nationality,
    address,
    bio,
    sectors,
    preferredSectors,
  }) => {
    try {
      const res = await createUserProfile({
        nationality,
        address,
        bio,
        sectors: sectors.map(sector => sector.value),
        matching_sectors: preferredSectors.map(sector => sector.value),
        id: user?.id,
      }).unwrap();

      if (res.success) {
        toast.success(res?.message);
        navigate('/account-creation-confirmation');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <div className='container mx-auto flex max-w-6xl items-center px-4 py-8 mt-20 lg:px-0'>
        {/* Left Section */}
        <div className='hidden w-1/2 flex-col space-y-4 lg:flex px-6'>
          <h1 className='text-[3.5rem] font-bold leading-[1.2]'>Complete Your Profile</h1>
          <p className='text-[1.25rem]'>We would like to know you more</p>
        </div>

        {/* Form Section */}
        <div className='w-full lg:w-1/2 lg:max-w-md xl:ml-auto'>
          <div className='bg-white px-6 md:px-[2.5rem] py-8 rounded-lg shadow-sm space-y-6'>
            <h2 className='text-[2rem] font-bold'>Profile Info</h2>

            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
              {/* Personal Info */}
              <div className='space-y-2'>
                <h2 className='text-md font-semibold'>Personal Info</h2>
                <div>
                  <Input
                    id='nationality'
                    type='text'
                    {...register('nationality', { required: 'Nationality is required' })}
                    placeholder='Nationality'
                  />
                  {errors.nationality && <p className='mt-2 text-sm text-red-600'>{errors.nationality.message}</p>}
                </div>

                <div>
                  <Input
                    id='address'
                    type='text'
                    {...register('address', { required: 'Address is required' })}
                    placeholder='Address'
                  />
                  <small className='text-muted'>Enter the name of your address manually</small>
                  {errors.address && <p className='mt-2 text-sm text-red-600'>{errors.address.message}</p>}
                </div>
              </div>

              {/* Professional Info */}
              <div className='space-y-3 pb-4'>
                <h2 className='text-md font-semibold'>Professional Info</h2>

                <div>
                  <Textarea
                    id='bio'
                    {...register('bio', {
                      required: 'Bio is required',
                      maxLength: {
                        value: 500,
                        message: 'Bio cannot exceed 500 characters',
                      },
                    })}
                    placeholder='Bio'
                    rows={3}
                  />
                  {errors.bio && <p className='mt-2 text-sm text-red-600'>{errors.bio.message}</p>}
                </div>

                <div>
                  <label htmlFor='sectors' className='block text-sm font-medium text-gray-700'>
                    Sector/Industry
                  </label>
                  <Controller
                    name='sectors'
                    control={control}
                    rules={{
                      required: 'Please select at least one sector',
                      validate: value => value.length > 0 || 'Please select at least one sector',
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={sectorOptions}
                        isMulti
                        placeholder='Select sectors'
                        className='mt-1'
                        classNamePrefix='react-select'
                        styles={
                          {
                            // ... (existing styles remain the same)
                          }
                        }
                      />
                    )}
                  />
                  {errors.sectors && <p className='mt-2 text-sm text-red-600'>{errors.sectors.message}</p>}
                </div>

                <div>
                  <label htmlFor='preferredSectors' className='block text-sm font-medium text-gray-700'>
                    Preferred Matching Sector
                  </label>
                  <Controller
                    name='preferredSectors'
                    control={control}
                    rules={{
                      required: 'Please select at least one preferred sector',
                      validate: value => value.length > 0 || 'Please select at least one preferred sector',
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={sectorOptions}
                        isMulti
                        placeholder='Select preferred sectors'
                        classNamePrefix='react-select'
                        styles={
                          {
                            // ... (existing styles remain the same)
                          }
                        }
                      />
                    )}
                  />
                  {errors.preferredSectors && (
                    <p className='mt-2 text-sm text-red-600'>{errors.preferredSectors.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button type='submit' className='w-full' isLoading={isLoading} loadingText='Submitting'>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
