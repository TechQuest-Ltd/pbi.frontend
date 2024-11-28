import { Card } from '@/components/ui/card';

import { reaction, showcase, showcaseSample } from '@/assets';
import { Separator } from '@/components/ui/separator';

interface ShowCaseCardProps {
  name: string;
  time: string;
  title: string;
  content: string;
}

const ShowCaseCard = ({ name, time, title, content }: ShowCaseCardProps) => {
  return (
    <Card className='w-fit bg-white border border-mutedForeground shadow-none rounded-[12px] max-w-full h-auto mb-3'>
      <div className='flex flex-col space-y-5 py-[24px] px-[20px]'>
        <div className='flex items-center space-x-3'>
          <img src={showcase} alt='showcase' className='w-[70px] h-auto' />
          <div className='flex flex-col space-y-2'>
            <small className='font-bold text-[1rem]'>{name}</small>
            <div className='flex space-x-2'>
              <small className='text-[14px] text-muted'>{time}</small>
            </div>
          </div>
        </div>
        <div className='space-y-6'>
          <img src={showcaseSample} className='w-full' alt='showcase image' />
          <h2 className='font-bold text-[1rem]'>{title}</h2>
          <p>{content}</p>
          <Separator className='bg-mutedForeground' />
          <div className='flex items-center justify-between'>
            <img src={reaction} alt='reaction emoji' />
            <small className='text-[14px] text-muted'>{time}</small>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ShowCaseCard;
