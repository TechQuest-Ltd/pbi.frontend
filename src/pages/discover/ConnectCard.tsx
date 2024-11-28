import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { passport, post } from '@/assets';

interface ConnectCardProps {
  name: string;
  position: string;
  imageSrc: string;
}

const ConnectCard = ({ name, position }: ConnectCardProps) => {
  return (
    <Card className='w-full bg-white border border-mutedForeground shadow-none rounded-[12px] overflow-hidden'>
      <div className='flex flex-col space-y-5 py-[24px] px-[20px]'>
        <div className='flex items-center space-x-3'>
          <img src={passport} alt='passport' className='w-[70px] h-[70px] object-cover rounded-md' />
          <div className='flex flex-col space-y-2 overflow-hidden'>
            <h1 className='font-bold text-[1rem] truncate'>{position}</h1>
            <div className='flex items-center space-x-2'>
              <img src={post} alt='post icon' className='w-5 h-5 flex-shrink-0' />
              <h1 className='text-sm truncate'>{name}</h1>
            </div>
          </div>
        </div>
        <Button variant='secondary' className='w-fit text-primary/70'>
          Connect
        </Button>
      </div>
    </Card>
  );
};

export default ConnectCard;
