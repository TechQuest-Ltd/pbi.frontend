import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { home1, home2, home3, home4, home5 } from '@/assets';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen w-full flex items-start lg:items-center pt-20 lg:pt-0'>
      <div className='w-full max-w-6xl mx-auto px-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-20 items-center'>
        {/* Left Column - Text Content */}
        <div className='space-y-6 text-center lg:text-left'>
          <h1 className='text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.2] text-[#1a1a2e]'>
            Connect,
            <br />
            Collaborate, and
            <br />
            Grow Together.
          </h1>
          <p className='text-lg text-gray-600 max-w-lg mx-auto lg:mx-0'>
            Ready to connect with African businesses and professionals in your industry through AI-powered matching
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <Button onClick={() => navigate('/create-account')} className='w-full sm:w-auto'>
              Get Started
            </Button>
            <Button
              variant='ghost'
              className='text-gray-700 hover:text-gray-900 hover:bg-transparent p-0 w-full sm:w-auto flex items-center justify-center'
            >
              Learn More <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Right Column - Responsive Image Grid */}
        <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px]'>
          {/* First column - two images */}
          <div className='absolute left-0 bottom-0 w-[32%] flex flex-col gap-2 lg:gap-4'>
            <Card className='overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-xl lg:rounded-3xl h-[140px] md:h-[180px] lg:h-[220px]'>
              <img src={home1} alt='Professional with glasses' className='w-full h-full object-cover' />
            </Card>
            <Card className='overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-xl lg:rounded-3xl h-[140px] md:h-[180px] lg:h-[220px]'>
              <img src={home3} alt='Professional presenting' className='w-full h-full object-cover' />
            </Card>
          </div>

          {/* Middle column - two images */}
          <div className='absolute left-[34%] top-0 w-[32%] flex flex-col gap-2 lg:gap-4'>
            <Card className='overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-xl lg:rounded-3xl h-[180px] md:h-[220px] lg:h-[280px]'>
              <img src={home2} alt='Graduate' className='w-full h-full object-cover' />
            </Card>
            <Card className='overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-xl lg:rounded-3xl h-[120px] md:h-[150px] lg:h-[180px]'>
              <img src={home4} alt='Scientist' className='w-full h-full object-cover' />
            </Card>
          </div>

          {/* Last column - single image */}
          <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[32%]'>
            <Card className='overflow-hidden bg-gradient-to-br from-[#f5b355] to-[#f55c5c] rounded-xl lg:rounded-3xl h-[260px] md:h-[320px] lg:h-[400px]'>
              <img src={home5} alt='Professional in white' className='w-full h-full object-cover' />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
