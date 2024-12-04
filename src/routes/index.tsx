import {
  CollaboratePage,
  ConnectPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ProfilePage,
  CreateAccountPage,
  ProfessionPage,
  ResetPasswordPage,
  DiscoverPage,
  NotFoundPage,
  AccountCreatedConfirmationPage,
  EmailVerificationSuccessPage,
} from '@/pages';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/profile', element: <ProfilePage />, authRequired: true },
  { path: '/create-account', element: <CreateAccountPage /> },
  { path: '/account-creation-confirmation', element: <AccountCreatedConfirmationPage /> },
  { path: '/email-verification/:verificationToken', element: <EmailVerificationSuccessPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/connect', element: <ConnectPage /> },
  { path: '/collaborate', element: <CollaboratePage /> },
  { path: '/profession', element: <ProfessionPage /> },
  { path: '/discover', element: <DiscoverPage />, authRequired: true },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
