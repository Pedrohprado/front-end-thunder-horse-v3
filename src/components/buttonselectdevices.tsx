import { useEffect, useState } from 'react';
import { TypeResumeDevice } from '../types/TypeDevice';

const ButtonSelectDevices = ({
  isAllIdDevices,
  isSelectDevices,
  setSelectDevices,
}: {
  isAllIdDevices: TypeResumeDevice[];
  isSelectDevices: string[] | null;
  setSelectDevices: (isSelectDevices: string[]) => void;
}) => {
  const [isListOfPrometeus, setListOfPrometeus] = useState<boolean>(false);

  const handleCheckBoxChange = (deviceId: string) => {
    if (isSelectDevices) {
      if (isSelectDevices.includes(deviceId)) {
        setSelectDevices(isSelectDevices.filter((id) => id !== deviceId));
      } else {
        setSelectDevices([...isSelectDevices, deviceId]);
      }
    } else {
      setSelectDevices([deviceId]);
    }
  };

  useEffect(() => {
    console.log(isSelectDevices);
  }, [isSelectDevices]);

  return (
    <>
      <button
        onClick={() => setListOfPrometeus(!isListOfPrometeus)}
        className='bg-[#234476]  p-2 text-white text-sm rounded flex items-center justify-center gap-2 absolute top-[3%]'
      >
        selecione os dispositivos
      </button>

      {isAllIdDevices && isListOfPrometeus && (
        <div className=' opacity-0 translate-y-[-10px] animate-animationleft border w-1/2 p-3 rounded bg-slate-50 text-zinc-900 fixed  top-[9%] z-10 flex justify-between'>
          {isAllIdDevices.map((devices) => (
            <label
              key={devices.id}
              className=' flex text-sm items-center gap-1 bg-[#234476] p-2 rounded text-white'
            >
              <input
                type='checkbox'
                checked={
                  isSelectDevices ? isSelectDevices.includes(devices.id) : false
                }
                onChange={() => handleCheckBoxChange(devices.id)}
                value={devices.id}
                name=''
                id=''
              />
              {devices.prometeusCode}
            </label>
          ))}
        </div>
      )}
      {}
    </>
  );
};

export default ButtonSelectDevices;
