import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';

const Messages = () => {
  const [activeMessageTab, setActiveMessageTab] = useState(localStorage.getItem('message-tabs') || 'All');

  return (
    <div className='w-1/4'>
      <Tabs value={activeMessageTab} onValueChange={setActiveMessageTab} className='hidden md:block flex-grow-0 '>
        <TabsList className='flex space-x-2 bg-[#e2e2e2]'>
          <TabsTrigger value='All' className='flex items-center gap-2'>
            All Messages
          </TabsTrigger>
          <TabsTrigger value='Unread' className='flex items-center gap-2'>
            Unread
          </TabsTrigger>
          <TabsTrigger value='Muted' className='flex items-center gap-2'>
            Muted
          </TabsTrigger>
        </TabsList>
        <TabsContent value='All'>
          <p className='pt-8 text-sm'>No Messages</p>
        </TabsContent>
        <TabsContent value='Unread'>
          <p className='pt-8 text-sm'>No Messages</p>
        </TabsContent>
        <TabsContent value='Muted'>
          <p className='pt-8 text-sm'>No Messages</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
