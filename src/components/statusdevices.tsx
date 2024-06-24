import { useEffect, useState } from 'react';
import { TypeStatusPrometeus } from '../types/TypePrometeusStatus';
import { IoHardwareChipOutline } from 'react-icons/io5';

const StatusDevices = () => {
  const [isStatusPrometus, setStatusPrometeus] = useState<
    null | TypeStatusPrometeus[]
  >(null);

  const handleSocketMessage = (event: { data: string }) => {
    try {
      const data: TypeStatusPrometeus[] = JSON.parse(event.data);
      setStatusPrometeus(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://172.31.98.228:8080');

    socket.addEventListener('open', () => {
      socket.send('conexão estalecida');
    });

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <section className=' w-1/3 bg-slate-50 h-full rounded border flex flex-col gap-5 px-2 py-8'>
      <h3 className=' font-bold'>Status Prometeus</h3>
      <div className=' flex flex-col gap-2 overflow-y-auto'>
        {isStatusPrometus
          ? isStatusPrometus.map((item) => (
              <div
                key={item.prometeus}
                className=' w-full shadow bg-white border rounded p-2 flex flex-col gap-1'
              >
                <div className=' flex items-center gap-2'>
                  <div className=' p-1 bg-orange-600 rounded'>
                    <IoHardwareChipOutline size={20} color='white' />
                  </div>

                  <p className=' text-sm font-bold'>{item.prometeus}</p>
                </div>
                <div className=' flex items-center gap-2'>
                  <div
                    className={` w-2 h-2 rounded-full animate-pulse ${
                      item.status === 'parado' ? ' bg-red-600 ' : 'bg-green-600'
                    }`}
                  ></div>
                  <p className=' text-gray-500'>{item.status}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default StatusDevices;
