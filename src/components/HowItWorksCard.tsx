import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface HowItWorksCardProps {
  icon: string;
  title: string;
  description: string;
}

const HowItWorksCard = ({ icon, title, description }: HowItWorksCardProps) => {
  return (
    <Card className='w-full bg-transparent border border-secondary shadow-none'>
      <CardHeader className='text-[1.25rem]'>
        <div className='flex items-center space-x-3'>
          <img src={icon} alt='' />
          <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='text-gray-700 px-6'>{description}</CardContent>
    </Card>
  );
};

export default HowItWorksCard;
