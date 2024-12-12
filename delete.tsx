import React, { useMemo, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useCreateUserProfileMutation, useGetSectorsQuery, useGetUserProfileQuery } from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/lib/utils';
import customStyles from '@/components/CustomCSSMultiSelect';
import Spinner from '../../components/Spinner';
import { Camera, Trash2, Upload } from 'lucide-react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Account type options
const accountTypeOptions: SelectOption[] = [
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'BUSINESS', label: 'Business' },
];

// Define interfaces
interface SelectOption {
  value: string;
  label: string;
}

interface Sector {
  id: number;
  name: string;
}

interface ProfileFormInputs {
  account_type: SelectOption;
  bio: string;
  age: number;
  sectors: SelectOption[];
  matching_sectors: SelectOption[];
}

interface CreateProfilePayload {
  id: string;
  account_type: string;
  picture: string;
  bio: string;
  age: number;
  sectors: number[];
  matching_sectors: number[];
}

// MinIO S3 Client Configuration
const s3Client = new S3Client({
  endpoint: import.meta.env.VITE_MINIO_PUBLIC_URL,
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_MINIO_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

const MINIO_BUCKET = import.meta.env.VITE_MINIO_BUCKET || 'profile-images';
const DEFAULT_PROFILE_IMAGE = 'https://via.placeholder.com/150';

const CreateProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      account_type: { value: 'PERSONAL', label: 'Personal' },
      age: 18,
    },
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const [createUserProfile, { isLoading: isSubmitting }] = useCreateUserProfileMutation();
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserProfileQuery(user?.id);
  const { data: sectorsData, isLoading: isLoadingSectors } = useGetSectorsQuery({});

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
      value: sector.id.toString(),
      label: sector.name,
    }));
  }, [sectorsData]);

  // MinIO Image Upload Function
  const uploadImageToMinIO = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      // Generate unique filename
      const fileName = `profile_${user?.id}_${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`;

      // Convert file to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Upload file to MinIO
      const uploadCommand = new PutObjectCommand({
        Bucket: MINIO_BUCKET,
        Key: fileName,
        Body: uint8Array,
        ContentType: file.type,
      });

      await s3Client.send(uploadCommand);

      // Construct public URL
      const imageUrl = `${import.meta.env.VITE_MINIO_PUBLIC_URL}/${MINIO_BUCKET}/${fileName}`;

      return imageUrl;
    } catch (error) {
      console.error('MinIO Upload Error:', error);
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setImageFile(file);
        };
        reader.readAsDataURL(file);

        // Attempt to upload image and get URL
        const uploadedUrl = await uploadImageToMinIO(file);
        setUploadedImageUrl(uploadedUrl);
        toast.success('Image uploaded successfully');
      } catch (error) {
        handleError(error);
        // Reset image states if upload fails
        setProfileImage(null);
        setImageFile(null);
        setUploadedImageUrl(null);
      }
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setProfileImage(null);
    setImageFile(null);
    setUploadedImageUrl(null);
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = async ({ account_type, bio, sectors, matching_sectors, age }) => {
    try {
      // Ensure user ID is available before submission
      if (!user?.id) {
        toast.error('User ID is missing');
        return;
      }

      // Validate image upload if an image was selected
      const pictureUrl = uploadedImageUrl || DEFAULT_PROFILE_IMAGE;

      const payload: CreateProfilePayload = {
        id: user.id,
        account_type: account_type.value,
        picture: pictureUrl,
        bio,
        age,
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

            {/* Profile Picture Upload */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                {profileImage ? (
                  <div className='relative'>
                    <img
                      src={profileImage}
                      alt='Profile'
                      className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
                    />
                    <div className='absolute bottom-0 right-0 flex space-x-2'>
                      {isUploadingImage ? (
                        <Spinner size={16} />
                      ) : (
                        <>
                          <button
                            type='button'
                            onClick={removeImage}
                            className='bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                            title='Remove image'
                          >
                            <Trash2 size={16} />
                          </button>
                          {!uploadedImageUrl && (
                            <button
                              type='button'
                              onClick={() => uploadImageToMinIO(imageFile!)}
                              className='bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600'
                              title='Upload image'
                            >
                              <Upload size={16} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center'>
                    <Camera size={32} className='text-gray-500' />
                  </div>
                )}
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  title='Upload profile picture'
                  disabled={isUploadingImage}
                />
              </div>
            </div>

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

              {/* Age Input */}
              <div className='space-y-2 mb-4'>
                <label htmlFor='age' className='block text-sm font-medium text-gray-700'>
                  Age
                </label>
                <Input
                  id='age'
                  type='number'
                  min={18}
                  max={100}
                  {...register('age', {
                    required: 'Age is required',
                    min: {
                      value: 18,
                      message: 'You must be at least 18 years old',
                    },
                    max: {
                      value: 100,
                      message: 'Age cannot exceed 100',
                    },
                  })}
                  placeholder='Enter your age'
                />
                {errors.age && <p className='mt-2 text-sm text-red-600'>{errors.age.message}</p>}
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
                disabled={isLoadingSectors || isUploadingImage}
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