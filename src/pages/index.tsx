import Home from './home';
import ResetPassword from './auth/ResetPassword';
import ForgotPassword from './auth/ForgotPassword';
import Login from './auth/Login';
import CreateAccount from './auth/CreateAccount';
import Connect from './connect';
import Collaborate from './collaborate';
import Profession from './profession';
import Discover from './discover';

import NotFound from './notFound';

// pages
const HomePage: React.FC = () => <Home />;
const LoginPage: React.FC = () => <Login />;
const CreateAccountPage: React.FC = () => <CreateAccount />;
const ForgotPasswordPage: React.FC = () => <ForgotPassword />;
const ResetPasswordPage: React.FC = () => <ResetPassword />;
const ConnectPage: React.FC = () => <Connect />;
const CollaboratePage: React.FC = () => <Collaborate />;
const ProfessionPage: React.FC = () => <Profession />;
const DiscoverPage: React.FC = () => <Discover />;

const NotFoundPage: React.FC = () => <NotFound />;

// export
export {
  HomePage,
  LoginPage,
  CreateAccountPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ConnectPage,
  CollaboratePage,
  ProfessionPage,
  DiscoverPage,
  NotFoundPage,
};
