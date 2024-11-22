import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { home1, home2, home3, home4, home5 } from '@/assets';

const Hero = () => {
  return (
    <div className='h-screen w-full flex items-center'>
      <div className='w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        {/* Left Column - Text Content */}
        <div className='space-y-6'>
          <h1 className='text-[2.75rem] lg:text-[3.5rem] font-bold leading-[1.2] text-[#1a1a2e]'>
            Connect,
            <br />
            Collaborate, and
            <br />
            Grow Together.
          </h1>
          <p className='text-lg text-gray-600'>
            Connect with perfect-match businesses and professionals in your industry through AI-powered matching.
          </p>
          <div className='flex gap-4'>
            <Button className='bg-gradient-to-r from-[#f5b355] to-[#f55c5c] text-white border-0 hover:opacity-90'>
              Get Started
            </Button>
            <Button variant='ghost' className='text-gray-700 hover:text-gray-900 hover:bg-transparent p-0'>
              Learn More <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Right Column - Image Grid */}
        <div className='grid grid-cols-6 grid-rows-6 gap-4 h-[600px]'>
          <Card className='col-span-3 row-span-2 overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-3xl'>
            <img src={home1} alt='Professional with glasses' className='w-full h-full object-cover' />
          </Card>

          <Card className='col-span-3 row-span-3 overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-3xl'>
            <img src={home2} alt='Graduate' className='w-full h-full object-cover' />
          </Card>

          <Card className='col-span-3 row-span-2 overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-3xl'>
            <img src={home3} alt='Professional presenting' className='w-full h-full object-cover' />
          </Card>

          <Card className='col-span-3 row-span-2 overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-3xl'>
            <img src={home4} alt='Scientist' className='w-full h-full object-cover' />
          </Card>

          <Card className='col-span-3 row-span-3 overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-3xl'>
            <img src={home5} alt='Professional in white' className='w-full h-full object-cover' />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
