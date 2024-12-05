import React, { useMemo, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useCreateUserProfileMutation, useGetSectorsQuery, useGetUserProfileQuery } from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/lib/utils';
import customStyles from '@/components/CustomCSSMultiSelect';
import Spinner from '../../components/Spinner';

// Account type options
const accountTypeOptions: SelectOption[] = [
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'BUSINESS', label: 'Business' },
];

const CreateProfile: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      account_type: { value: 'PERSONAL', label: 'Personal' },
    },
  });

  const { user } = useAuth();

  const [createUserProfile, { isLoading: isSubmitting }] = useCreateUserProfileMutation();
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserProfileQuery(user?.id);
  const { data: sectorsData, isLoading: isLoadingSectors } = useGetSectorsQuery({});

  const navigate = useNavigate();

  // Check for existing user profile and redirect if exists
  useEffect(() => {
    if (userProfile) {
      navigate('/discover');
    }
  }, [userProfile, navigate]);

  // Transform sectors from API to Select options
  const sectorOptions = useMemo<SelectOption[]>(() => {
    if (!sectorsData || !sectorsData.data) return [];

    return sectorsData.data.map((sector: Sector) => ({
      value: sector.id,
      label: sector.name,
    }));
  }, [sectorsData]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async ({ account_type, bio, sectors, matching_sectors }) => {
    try {
      // Ensure user ID is available before submission
      if (!user?.id) {
        toast.error('User ID is missing');
        return;
      }

      const payload: CreateProfilePayload = {
        id: user.id,
        account_type: account_type.value as string,
        picture: 'https://via.placeholder.com/150',
        bio,
        sectors: sectors.map(sector => Number(sector.value)),
        matching_sectors: matching_sectors.map(sector => Number(sector.value)),
      };

      const res = await createUserProfile(payload).unwrap();

      if (res.success) {
        toast.success(res?.message);
        navigate('/discover');
      }
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner size={30} />
      </div>
    );
  }

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
              {/* Account Type Selection */}
              <div className='space-y-2 mb-4'>
                <label htmlFor='account_type' className='block text-sm font-medium text-gray-700'>
                  Account Type
                </label>
                <Controller
                  name='account_type'
                  control={control}
                  rules={{ required: 'Account type is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id='account_type'
                      options={accountTypeOptions}
                      placeholder='Select account type'
                      classNamePrefix='react-select'
                      styles={customStyles}
                    />
                  )}
                />
                {errors.account_type && <p className='mt-2 text-sm text-red-600'>{errors.account_type.message}</p>}
              </div>

              {/* Professional Info */}
              <div className='space-y-3 pb-4'>
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
                        isLoading={isLoadingSectors}
                        placeholder='Select sectors'
                        className='mt-1'
                        classNamePrefix='react-select'
                        styles={customStyles}
                      />
                    )}
                  />
                  {errors.sectors && <p className='mt-2 text-sm text-red-600'>{errors.sectors.message}</p>}
                </div>

                <div>
                  <label htmlFor='matching_sectors' className='block text-sm font-medium text-gray-700'>
                    Preferred Matching Sector
                  </label>
                  <Controller
                    name='matching_sectors'
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
                        isLoading={isLoadingSectors}
                        placeholder='Select preferred sectors'
                        classNamePrefix='react-select'
                        styles={customStyles}
                      />
                    )}
                  />
                  {errors.matching_sectors && (
                    <p className='mt-2 text-sm text-red-600'>{errors.matching_sectors.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                className='w-full'
                isLoading={isSubmitting}
                loadingText='Submitting'
                disabled={isLoadingSectors}
              >
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
