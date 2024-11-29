import { home1, home2, home3, home4, home5 } from '@/assets';
import { MessagesSquare, Package2 } from 'lucide-react';

export const navItems = [
  {
    label: 'Connect',
    path: '/connect',
    testId: 'nav-connect',
  },
  {
    label: 'Collaborate',
    path: '/collaborate',
    testId: 'nav-collaborate',
  },
  {
    label: 'Profession',
    path: '/profession',
    testId: 'nav-profession',
  },
];

// footer constants
export const footerLinks = {
  Company: [
    { name: 'About Us', path: '/about', testId: 'about-link' },
    { name: 'Careers', path: '/careers', testId: 'careers-link' },
    { name: 'Contact', path: '/contact', testId: 'contact-link' },
  ],
  Resources: [
    { name: 'Blog', path: '/blog', testId: 'blog-link' },
    { name: 'Success Stories', path: '/success-stories', testId: 'success-stories-link' },
    { name: 'FAQs', path: '/faqs', testId: 'faqs-link' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/privacy', testId: 'privacy-link' },
    { name: 'Terms of Service', path: '/terms', testId: 'terms-link' },
    { name: 'Cookie Policy', path: '/cookies', testId: 'cookies-link' },
  ],
  Connect: [
    { name: 'Twitter', path: 'https://twitter.com', testId: 'twitter-link', external: true },
    { name: 'LinkedIn', path: 'https://linkedin.com', testId: 'linkedin-link', external: true },
    { name: 'Instagram', path: 'https://instagram.com', testId: 'instagram-link', external: true },
  ],
};

// routes
export const hideNavbarRoutes = ['/discover', '/account-creation-confirmation', '/email-verification'];
export const hideFooterRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/create-account',
  '/discover',
  '/account-creation-confirmation',
  '/email-verification',
];

// local storage constant
export const CURRENCY_STORAGE_KEY = 'panafrica_preferredCurrency';

export const images = [
  {
    src: { home1 },
    alt: 'Professional with glasses',
    className: 'col-span-1 row-span-1',
  },
  {
    src: { home2 },
    alt: 'Graduate in cap and gown',
    className: 'col-span-1 row-span-1',
  },
  {
    src: { home3 },
    alt: 'Professional presenting',
    className: 'col-span-1 row-span-1',
  },
  {
    src: home4,
    alt: 'Scientist at microscope',
    className: 'col-span-1 row-span-1',
  },
  {
    src: home5,
    alt: 'Professional in white suit',
    className: 'col-span-1 row-span-1',
  },
];

export const navLinks = [
  { href: '/messages', label: 'Messages', icon: MessagesSquare },
  { href: '/discover', label: 'Discover', icon: Package2 },
];

export const profiles = [
  {
    id: 1,
    name: 'John Niyontwali',
    position: 'Software Developer',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Jane Doe',
    position: 'UI/UX Designer',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Michael Smith',
    position: 'Data Scientist',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Michael Smith',
    position: 'Data Scientist',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Michael Smith',
    position: 'Data Scientist',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Michael Smith',
    position: 'Data Scientist',
    imageSrc: 'https://via.placeholder.com/150',
  },
];

export const posts = [
  {
    id: 1,
    name: 'John Niyontwali',
    time: 'Posted 2 mins ago',
    title: 'Building Scalable React Applications',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    id: 2,
    name: 'Jane Doe',
    time: 'Posted 1 hour ago',
    title: 'The Importance of User-Centric Design',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    name: 'Michael Smith',
    time: 'Posted 3 hours ago',
    title: 'Exploring Machine Learning Algorithms',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];
