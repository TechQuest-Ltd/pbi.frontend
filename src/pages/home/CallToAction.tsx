import { Button } from '@/components/ui/button';
import { match } from '@/assets';

const CallToAction = () => {
  return (
    <section className='max-w-6xl mx-auto px-6'>
      <div className='grid lg:grid-cols-2 gap-8 items-center'>
        {/* Left column with text */}
        <div className='space-y-6'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>Ready to Find Your Professional Match?</h2>
          <p className='text-lg text-gray-800'>
            Join thousands of professionals who have already found their career connections
          </p>
          <Button className=''>Create Your Profile</Button>
        </div>

        {/* Right column with image */}
        <div className='relative h-[400px] lg:h-[500px]'>
          <img src={match} alt='Professional meeting' className='w-full h-full object-cover rounded-lg' />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
