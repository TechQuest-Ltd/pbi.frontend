import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { footerLinks, hideFooterRoutes } from '@/constants';

const Footer: React.FC = () => {
  const location = useLocation();

  // Helper function to determine if current route should hide footer
  const isRouteHidden = (path: string) => {
    return hideFooterRoutes.some(route => path.startsWith(route));
  };

  // Don't render footer on certain routes
  if (isRouteHidden(location.pathname)) {
    return null;
  }

  // Render footer link with proper handling for external links
  const renderFooterLink = (link: { name: string; path: string; testId: string; external?: boolean }) => {
    if (link.external) {
      return (
        <li key={link.path}>
          <a
            href={link.path}
            target='_blank'
            rel='noopener noreferrer'
            data-testid={link.testId}
            className='text-mutedForeground hover:text-mutedForeground/70 transition-colors duration-200 text-sm'
          >
            {link.name}
          </a>
        </li>
      );
    }

    return (
      <li key={link.path}>
        <Link
          to={link.path}
          data-testid={link.testId}
          className='text-mutedForeground hover:text-mutedForeground/70 transition-colors duration-200 text-sm'
        >
          {link.name}
        </Link>
      </li>
    );
  };

  return (
    <footer className='w-full bg-primary text-muted py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className='space-y-4'>
              <h3 className='font-semibold text-mutedForeground text-lg'>{category}</h3>
              <ul className='space-y-2'>{links.map(link => renderFooterLink(link))}</ul>
            </div>
          ))}
        </div>

        <Separator className='my-8 bg-gray-800' />

        <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0'>
          <div className='text-sm text-mutedForeground '>
            &copy; {new Date().getFullYear()} PANAFRICA BUSINESS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
