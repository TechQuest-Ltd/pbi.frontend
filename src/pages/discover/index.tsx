import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Search, Globe, Users, Compass, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navLinks } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import AllConnections from './AllConnections';
import ForMeConnections from './ForMeConnections';
import DiscoverConnections from './DiscoverConnections';
import { logout } from '@/redux/reducers/authSlice';

const Discover = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('panafrica-filter') || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  // Keyboard shortcut for focusing search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+F or Cmd+F (for Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    if (user?.token) {
      dispatch(logout());
    }
    navigate('/login');
  };

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 h-14 bg-primary lg:h-[60px] '>
        <div className='h-full max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between '>
          {/* Mobile Menu Toggle - Visible only on smaller screens */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='shrink-0 hover:bg-bg-none'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='flex flex-col'>
                <nav className='grid gap-2 text-lg font-medium'>
                  {navLinks.map(link => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                    >
                      <link.icon className='h-5 w-5' />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tabs with Icons - Hidden on mobile, shown on md and up */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className='hidden md:block flex-grow-0 '>
            <TabsList className='flex space-x-2 bg-[#e2e2e2]'>
              <TabsTrigger value='All' className='flex items-center gap-2'>
                <Globe className='h-4 w-4' />
                All
              </TabsTrigger>
              <TabsTrigger value='ForMe' className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                For Me
              </TabsTrigger>
              <TabsTrigger value='Discover' className='flex items-center gap-2'>
                <Compass className='h-4 w-4' />
                Discover
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar - Centered */}
          <div className='w-full max-w-xs relative group'>
            <form>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted' />
                <Input
                  ref={searchInputRef}
                  type='search'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Search ....'
                  className='w-full appearance-none bg-[#e2e2e2] pl-8 shadow-none py-4'
                />
                <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground hidden group-hover:flex items-center gap-1'>
                  <Keyboard className='h-3 w-3' />
                  <span>Ctrl+F</span>
                </div>
              </div>
            </form>
          </div>

          {/* User Avatar */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className='bg-[#e2e2e2] cursor-pointer'>
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px] '>
              <DropdownMenuLabel className='flex items-center'>
                <Avatar>
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <p className='pl-2'>{user?.name || 'User'} 👋🏽</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('/account-settings')}>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Content Container - Adjusted for Header Height */}
      <main className='pt-14 lg:pt-[20px] '>
        {/* Tabs Content */}
        <div className='max-w-6xl mx-auto px-4 md:px-6'>
          <Tabs value={activeTab}>
            <TabsContent value='All'>
              <AllConnections />
            </TabsContent>
            <TabsContent value='ForMe'>
              <ForMeConnections />
            </TabsContent>
            <TabsContent value='Discover'>
              <DiscoverConnections />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Discover;
