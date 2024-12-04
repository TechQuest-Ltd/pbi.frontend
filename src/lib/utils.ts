import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

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
