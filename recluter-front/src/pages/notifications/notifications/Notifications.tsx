import React, { useState } from 'react';
import NotificationsA from '../../../components/pages/notifications/Notifications';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all'); // Estado para controlar la pestaña activa

  return (
    <>
  
      <div className="ml-[32px] mt-[10px]">
        <div className="flex justify-between">
          <div className="w-3/4">
            <NotificationsA />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
