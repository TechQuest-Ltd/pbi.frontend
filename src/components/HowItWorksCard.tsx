import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const HowItWorksCard = ({ icon, title, description }: HowItWorksCardProps) => {
  return (
    <Card className='flex flex-col justify-between shadow-none border border-secondary max-w-xs bg-transparent'>
      <CardHeader className='text-[1.25rem]'>
        <div className='flex items-center space-x-3'>
          <img src={icon} alt='' />
          <CardTitle className='text-lg font-semibold text-center'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='text-gray-700 px-6'>{description}</CardContent>
    </Card>
  );
};


export default HowItWorksCard;
