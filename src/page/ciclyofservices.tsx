import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Calendar from '../components/calendar';
import { getAllDevices, url } from '../api/api';
import { TypeDevicesCycle } from '../types/TypeCycle';
import LineGraphCycle from '../components/linegraphcycle';
import BlocsAllCycle from '../components/blocsallcycle';
import { TypeDevice, TypeResumeDevice } from '../types/TypeDevice';
import ButtonSelectDevices from '../components/buttonselectdevices';

const CiclyOfService = () => {
  const [isListOfPrometeus, setListOfPrometeus] = useState<boolean>(false);
  const [isButton, setButton] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [isSelectDevices, setSelectDevices] = useState<null | string[]>(null);
  const [isDaysCycle, setDaysCycle] = useState<null | TypeDevicesCycle[]>(null);
  const [isAllIdDevices, setAllIdDevices] = useState<[] | TypeResumeDevice[]>(
    []
  );

  useEffect(() => {
    async function fetchDatas() {
      const devices: TypeDevice[] = await getAllDevices();
      const arr: TypeResumeDevice[] = [];
      devices.map((item) =>
        arr.push({
          id: item.id,
          prometeusCode: item.prometeusCode,
        })
      );
      setAllIdDevices(arr);
    }

    fetchDatas();
  }, []);

  useEffect(() => {
    async function getFullCicly(from: string, to: string) {
      if (isSelectDevices) {
        const result: string = isSelectDevices.join(',');
        console.log(`${url}/servicecycle/${result}/${from}/${to}`);
        const response = await fetch(
          `${url}/servicecycle/${result}/${from}/${to}`
        );

        const data: TypeDevicesCycle[] = await response.json();
        setDaysCycle(data);

        console.log(data);
      }
    }

    if (selectedRange && selectedRange.from && selectedRange.to) {
      setButton(false);
      setListOfPrometeus(false);

      const from = selectedRange.from.toISOString().slice(0, 10);
      const to = selectedRange.to.toISOString().slice(0, 10);
      getFullCicly(from, to);
    }
  }, [selectedRange, isSelectDevices]);

  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8 py-4 gap-2'>
        <ButtonSelectDevices
          isListOfPrometeus={isListOfPrometeus}
          setListOfPrometeus={setListOfPrometeus}
          isAllIdDevices={isAllIdDevices}
          isSelectDevices={isSelectDevices}
          setSelectDevices={setSelectDevices}
        />

        <button
          onClick={() => setButton(!isButton)}
          className='bg-[#234476] w-40 p-2 text-white text-sm rounded flex items-center justify-center gap-2 absolute top-[3%] right-14'
        >
          {isButton ? (
            <p className=' w-40 flex items-center justify-center rounded opacity-0 translate-x-[-10px] animate-animationleft'>
              fechar
            </p>
          ) : (
            <>
              <IoCalendarClearOutline size={18} />
              selecione a data
            </>
          )}
        </button>
        {isButton ? (
          <Calendar
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        ) : null}
        {isDaysCycle ? <LineGraphCycle isDaysCycle={isDaysCycle} /> : 'testes'}
        {isDaysCycle ? (
          <BlocsAllCycle isAllCycle={isDaysCycle} />
        ) : (
          'sem informações'
        )}
      </section>
    </main>
  );
};

export default CiclyOfService;
