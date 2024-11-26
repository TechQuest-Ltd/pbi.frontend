import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mobile } from '@/assets';

const features = [
  {
    id: 1,
    title: 'Smart Matching',
    description: 'Industry sector, skills, and geographic location.',
    gradient: 'bg-custom-gradient',
    image: mobile,
  },
  {
    id: 2,
    title: 'Service Matching',
    description: 'Brief explanation of profile setup.',
    gradient: 'bg-custom-gradient',
    image: mobile,
  },
  {
    id: 3,
    title: 'Real-time Messaging',
    description: 'Brief explanation of real-time.',
    gradient: 'bg-custom-gradient',
    image: mobile,
  },
  {
    id: 4,
    title: 'Multi-language Support',
    description: 'Brief explanation of profile setup.',
    gradient: 'bg-custom-gradient',
    image: mobile,
  },
];

const KeyFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Automatically switch slides every 5000ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10'>
      {/* Left Section */}
      <div className='flex flex-col justify-center'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>Key Features</h2>
        <p className='mb-8  max-w-md'>
          Connect with perfect-match businesses and professionals in your industry through AI-powered matching.
        </p>
        <div className='space-y-4'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ width: '100%' }}
              animate={{
                width: activeFeature === index ? '98%' : '100%',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={`p-4 rounded-lg transform transition-all cursor-pointer ${
                activeFeature === index ? `${feature.gradient} text-white shadow-lg` : 'bg-white shadow-md text-primary'
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <h3 className={`text-lg font-semibold ${activeFeature === index ? 'text-white' : 'text-primary'}`}>
                {feature.title}
              </h3>
              <p className={`mt-1 text-sm ${activeFeature === index ? 'text-white' : 'text-primary'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className='relative md:flex justify-center items-center h-full hidden '>
        <div className='relative w-full max-w-sm lg:max-w-lg h-[250px] flex items-center justify-center'>
          <AnimatePresence mode='wait'>
            {features.map(
              (feature, index) =>
                index === activeFeature && (
                  <motion.img
                    key={feature.id}
                    src={feature.image}
                    alt={feature.title}
                    initial={{
                      x: 0,
                      zIndex: 1,
                    }}
                    animate={{
                      x: 0,
                      zIndex: 2,
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeInOut',
                    }}
                    className='absolute w-auto h-[500px] max-w-full object-contain rounded-lg'
                  />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
