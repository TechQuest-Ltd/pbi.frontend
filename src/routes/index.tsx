import {
  CollaboratePage,
  ConnectPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  CreateAccountPage,
  ProfessionPage,
  ResetPasswordPage,
  DiscoverPage,
  NotFoundPage,
} from '@/pages';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/create-account', element: <CreateAccountPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/connect', element: <ConnectPage /> },
  { path: '/collaborate', element: <CollaboratePage /> },
  { path: '/profession', element: <ProfessionPage /> },
  { path: '/discover', element: <DiscoverPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
