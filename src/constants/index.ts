import { home1, home2, home3, home4, home5 } from '@/assets';

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
export const hideNavbarRoutes = [];
export const hideFooterRoutes = ['/login', '/forgot-password', '/reset-password', '/create-account'];

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
