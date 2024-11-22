import { message, profile, users } from '@/assets';
import HowItWorksCard from '@/components/HowItWorksCard';

function HowItWorks() {
  return (
    <section className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between py-4 px-6'>
        <HowItWorksCard
          icon={profile}
          title='Create Your Profile'
          description='Build your professional profile highlighting your experience, skills, and career goals'
        />
        <HowItWorksCard
          icon={users}
          title='Match & Connect'
          description='Swipe through potential matches based on your professional interests and goals'
        />
        <HowItWorksCard
          icon={message}
          title='Collaborate & Grow'
          description='Start meaningful conversations and explore opportunities together'
        />
      </div>
    </section>
  );
}

export default HowItWorks;
