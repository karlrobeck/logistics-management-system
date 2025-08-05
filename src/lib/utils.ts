import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@/gqty';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useAuthQuery() {
  return useQuery({
    extensions: { authToken: localStorage.getItem('auth-token') },
  });
}
