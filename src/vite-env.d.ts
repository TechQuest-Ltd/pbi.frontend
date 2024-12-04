/// <reference types="vite/client" />

interface RouteObject {
  path: string;
  element: React.ReactNode;
  authRequired?: boolean;
  requiredRoles?: string[];
}

interface LoginFormInputs {
  email: string;
  password: string;
}

interface Profile {
  id: number;
  name: string;
  position: string;
  imageSrc: string;
}

interface Post {
  id: number;
  name: string;
  time: string;
  title: string;
  content: string;
}

interface SignUpFormInputs {
  first_name: string;
  last_name: string;
  phoneNumber: string;
  email: string;
  password: string;
}
interface ProfileFormInputs {
  first_name: string;
  last_name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface ForgotPasswordInputs {
  email: string;
}
interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

interface HowItWorksCardProps {
  icon: string;
  title: string;
  description: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Sector {
  id: number;
  name: string;
}

interface CreateProfilePayload {
  id?: string | number;
  account_type: string;
  picture: string;
  bio: string;
  sectors: number[];
  matching_sectors: number[];
}

interface ProfileFormInputs {
  account_type: SelectOption;
  bio: string;
  sectors: SelectOption[];
  matching_sectors: SelectOption[];
}
