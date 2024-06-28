import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Calendar from '../components/calendar';
import { getAllDevices, url } from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';
import { TypeAllCycle, TypeDayCycle } from '../types/TypeCycle';
import LineGraphCycle from '../components/linegraphcycle';
import BlocsAllCycle from '../components/blocsallcycle';
import { TypeDevice, TypeResumeDevice } from '../types/TypeDevice';
import ButtonSelectDevices from '../components/buttonselectdevices';

const CiclyOfService = () => {
  const [isButton, setButton] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [isSelectDevices, setSelectDevices] = useState<null | string[]>(null);
  const [isDaysCycle, setDaysCycle] = useState<null | TypeDayCycle[]>(null);
  const [isAllCycle, setAllCycle] = useState<null | TypeAllCycle[]>(null);
  const [isAllIdDevices, setAllIdDevices] = useState<[] | TypeResumeDevice[]>(
    []
  );

  const { isId } = useContext(GlobalContext);

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
      console.log(arr);
      setAllIdDevices(arr);
    }

    fetchDatas();
  }, []);

  useEffect(() => {
    async function getFullCicly(from: string, to: string) {
      console.log(`${url}/servicecycle/${isId}/${from}/${to}`);
      const response = await fetch(`${url}/servicecycle/${isId}/${from}/${to}`);
      const data: {
        0: TypeDayCycle[];
        1: TypeAllCycle[];
      } = await response.json();
      setDaysCycle(data[0].reverse());
      setAllCycle(data[1]);
      console.log(data);
    }

    if (selectedRange && selectedRange.from && selectedRange.to) {
      setButton(false);

      const from = selectedRange.from.toISOString().slice(0, 10);
      const to = selectedRange.to.toISOString().slice(0, 10);
      getFullCicly(from, to);
    }
  }, [selectedRange, isId]);

  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8 py-4 gap-2'>
        <ButtonSelectDevices
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
        {isAllCycle ? (
          <BlocsAllCycle isAllCycle={isAllCycle} />
        ) : (
          'sem informações'
        )}
      </section>
    </main>
  );
};

export default CiclyOfService;
