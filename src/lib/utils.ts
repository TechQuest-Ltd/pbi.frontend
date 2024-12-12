import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// truncate string texts
export const truncateString = (word: string, sliceNo: number) => {
  if (word.length > sliceNo) {
    return word.slice(0, sliceNo) + ' ...';
  }
  return word;
};

// get network status
export const getNetworkStatus = () => {
  return window.navigator.onLine;
};

export const handleError = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const { data } = error as { data: { message: string } };
    toast.error(data.message || 'Something went wrong', {
      duration: 2000,
    });
  } else {
    toast.error('Something went wrong', {
      duration: 2000,
    });
  }
};

// Constants for image validation
export const IMAGE_UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_WIDTH: 800,
  MAX_IMAGE_HEIGHT: 800,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};

//  Validates an image file against predefined constraints
export const validateImageFile = (file: File): boolean => {
  const { MAX_FILE_SIZE, ALLOWED_TYPES } = IMAGE_UPLOAD_CONSTANTS;

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    toast.error('Image must be smaller than 5MB');
    return false;
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    toast.error('Only JPEG, PNG, and WebP images are allowed');
    return false;
  }

  return true;
};

//  Compresses an image file while maintaining aspect ratio
export const compressImageFile = async (file: File): Promise<File> => {
  const { MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT } = IMAGE_UPLOAD_CONSTANTS;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if needed
        if (width > height) {
          if (width > MAX_IMAGE_WIDTH) {
            height *= MAX_IMAGE_WIDTH / width;
            width = MAX_IMAGE_WIDTH;
          }
        } else {
          if (height > MAX_IMAGE_HEIGHT) {
            width *= MAX_IMAGE_HEIGHT / height;
            height = MAX_IMAGE_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert canvas to file
        canvas.toBlob(
          blob => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Image compression failed'));
            }
          },
          file.type,
          0.7
        ); // 0.7 quality for compression
      };
      img.onerror = () => reject(new Error('Image loading failed'));
    };
    reader.onerror = () => reject(new Error('File reading failed'));
  });
};

// Generates a unique filename for uploaded images
export const generateUniqueFileName = (userId: string, originalFileName: string): string => {
  const timestamp = Date.now();
  const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
  return `profile_${userId}_${timestamp}${fileExtension}`;
};

// Reads a file and returns a data URL for preview
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

//  Creates a configured MinIO S3 client
export const createMinioClient = (): S3Client => {
  return new S3Client({
    endpoint: import.meta.env.VITE_MINIO_PUBLIC_URL,
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_MINIO_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_MINIO_SECRET_KEY,
    },
    forcePathStyle: true,
  });
};

// Uploads a file to MinIO storage
export const uploadToMinio = async (
  client: S3Client,
  file: File,
  fileName: string,
  bucket: string = import.meta.env.VITE_MINIO_BUCKET
): Promise<string> => {
  try {
    // Convert file to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload file to MinIO
    const uploadCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: uint8Array,
      ContentType: file.type,
    });

    await client.send(uploadCommand);

    // Construct and return public URL
    return `${import.meta.env.VITE_MINIO_PUBLIC_URL}/${bucket}/${fileName}`;
  } catch (error) {
    console.error('MinIO Upload Error:', error);
    toast.error('Failed to upload image');
    throw error;
  }
};
