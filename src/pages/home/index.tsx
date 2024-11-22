import CallToAction from './CallToAction';
import Hero from './Hero';
import HowItWorks from './HowItWorks';

const Home = () => {
  return (
    <main className='pt-[2rem] pb-[5rem] space-y-[5rem]'>
      <Hero />
      <HowItWorks />
      <CallToAction />
    </main>
  );
};

export default Home;
