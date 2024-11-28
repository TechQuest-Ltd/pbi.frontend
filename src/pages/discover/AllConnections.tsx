import React, { useRef, useState, useEffect } from 'react';
import ConnectCard from './ConnectCard';
import ShowCaseCard from './ShowCaseCard';

import { posts, profiles } from '@/constants';
import Messages from './Messages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AllConnections: React.FC = () => {
  const profilesContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCardCount, setVisibleCardCount] = useState(4);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activePostTab, setActivePostTab] = useState(localStorage.getItem('active-post') || 'All');
  const [isMobile, setIsMobile] = useState(false);

  // Update visible card count and check scrollability
  useEffect(() => {
    const updateVisibleCards = () => {
      if (typeof window === 'undefined') return;

      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);

      if (screenWidth >= 1536) setVisibleCardCount(6);
      else if (screenWidth >= 1280) setVisibleCardCount(5);
      else if (screenWidth >= 1024) setVisibleCardCount(4);
      else if (screenWidth >= 768) setVisibleCardCount(3);
      else setVisibleCardCount(2);
    };

    // Initial call
    updateVisibleCards();

    // Add resize listener
    window.addEventListener('resize', updateVisibleCards);

    // Check scrollability
    const checkScrollability = () => {
      const container = profilesContainerRef.current;
      if (!container) return;

      const isOverflowing = container.scrollWidth > container.clientWidth;
      setIsScrollable(isOverflowing);

      // Precise scroll position check
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      // Update scroll directions
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    };

    // Scroll event listener to update scroll positions
    const handleScroll = () => {
      checkScrollability();
    };

    // Delayed check to ensure DOM is fully rendered
    const scrollCheckTimeout = setTimeout(checkScrollability, 100);

    // Add resize observer
    const resizeObserver = new ResizeObserver(checkScrollability);
    if (profilesContainerRef.current) {
      resizeObserver.observe(profilesContainerRef.current);
      profilesContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
      clearTimeout(scrollCheckTimeout);
      resizeObserver.disconnect();
      if (profilesContainerRef.current) {
        profilesContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollProfiles = (direction: 'left' | 'right') => {
    const container = profilesContainerRef.current;
    if (!container) return;

    const cardElements = container.querySelectorAll('.profile-card');
    if (cardElements.length === 0) return;

    const cardWidth = cardElements[0].clientWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 16;
    const scrollAmount =
      direction === 'left'
        ? -(cardWidth * visibleCardCount + gap * (visibleCardCount - 1))
        : cardWidth * visibleCardCount + gap * (visibleCardCount - 1);

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Handle tab change with local storage
  const handleTabChange = (value: string) => {
    setActivePostTab(value);
    localStorage.setItem('active-post', value);
  };

  return (
    <main className='space-y-5 relative p-4 md:p-6'>
      {/* Profiles Section */}
      <section className='relative group'>
        {/* Left scroll indicator */}
        {isScrollable && canScrollLeft && !isMobile && (
          <button
            onClick={() => scrollProfiles('left')}
            className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>
        )}

        {/* Profiles container */}
        <div
          ref={profilesContainerRef}
          className='flex overflow-x-auto scrollbar-hide pb-4 scroll-smooth no-scrollbar'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${profiles.length}, minmax(300px, 1fr))`,
            gap: '1rem',
          }}
        >
          {profiles.map((profile: Profile) => (
            <div key={profile.id} className='profile-card w-full min-w-[300px]'>
              <ConnectCard name={profile.name} position={profile.position} imageSrc={profile.imageSrc} />
            </div>
          ))}
        </div>

        {/* Right scroll indicator */}
        {isScrollable && canScrollRight && !isMobile && (
          <button
            onClick={() => scrollProfiles('right')}
            className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        )}
      </section>

      <Separator className='bg-mutedForeground' />

      {/* Posts Section */}
      <section className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-between'>
        {/* Desktop Messages Sidebar */}
        {!isMobile && <Messages />}

        {/* Posts List */}
        <div className='w-full md:w-3/4 space-y-4'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <Button className='space-x-2 w-full md:w-auto'>
              <PlusSquare size='20' />
              <span>Start a Post</span>
            </Button>

            {/* Mobile Tabs */}
            <Tabs
              value={activePostTab}
              onValueChange={handleTabChange}
              className={` ${isMobile ? 'block w-full' : 'hidden md:block w-fit'}`}
            >
              <TabsList
                className={`
                  ${isMobile ? 'flex overflow-x-auto no-scrollbar' : ' w-fit'}
                  space-x-2  bg-[#e2e2e2]
                  w-full
                `}
              >
                <TabsTrigger value='All' className='flex-1 md:flex-none'>
                  All Posts
                </TabsTrigger>
                <TabsTrigger value='New' className='flex-1 md:flex-none'>
                  New
                </TabsTrigger>
                <TabsTrigger value='Old' className='flex-1 md:flex-none'>
                  Old
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Posts Content */}
          <Tabs value={activePostTab} onValueChange={handleTabChange}>
            <TabsContent value='All'>
              {posts.map((post: Post) => (
                <ShowCaseCard
                  key={post.id}
                  name={post.name}
                  time={post.time}
                  title={post.title}
                  content={post.content}
                />
              ))}
            </TabsContent>
            <TabsContent value='New'>
              <p className='pt-8 text-sm'>No New Posts</p>
            </TabsContent>
            <TabsContent value='Old'>
              <p className='pt-8 text-sm'>No Old Posts</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default AllConnections;
