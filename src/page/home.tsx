import { useEffect, useState } from 'react';
import InitialGraph from '../components/initalgraph';
import {
  TypeDevice,
  TypePerformancePrometeus,
  TypeResumeDevice,
} from '../types/TypeDevice';
import { getAllDevices, getCycleForDay, getLastWeldBead } from '../api/api';
import { TypeCycleOfPrometeusToDay } from '../types/TypeCycle';
import GraphCycleToDay from '../components/graphCycleToDay';

const Home = () => {
  // const [isInfoDevice, setInfoDevice] = useState<[] | TypeResumeDevice[]>([]);
  const [isIds, setIds] = useState<string>('');
  const [isCycleOfPrometeusToDay, setCycleOfPrometeusToDay] = useState<
    null | TypeCycleOfPrometeusToDay[]
  >(null);
  const [isWelding, setWelding] = useState<TypePerformancePrometeus[] | null>(
    null
  );

  useEffect(() => {
    async function getInfoDevices() {
      const devices: TypeDevice[] = await getAllDevices();
      const arr: TypeResumeDevice[] = [];
      const arrayId: string[] = [];

      devices.map((item) => {
        arr.push({
          id: item.id,
          prometeusCode: item.prometeusCode,
          setor: item.setor,
        });

        arrayId.push(item.id);
      });

      const ids: string = arrayId.join(',');
      setIds(ids);
    }

    getInfoDevices();
  }, []);

  useEffect(() => {
    async function getPerformancePrometeus() {
      const data: TypePerformancePrometeus[] = await getLastWeldBead(isIds);
      if (data)
        data.map((item) => {
          item.lastWelding.map(
            (subItems) =>
              (subItems.createdAt = new Date(
                subItems.createdAt
              ).toLocaleTimeString('pt-br'))
          );
        });

      setWelding(data);
    }

    const time = setInterval(() => {
      getPerformancePrometeus();
    }, 2000);

    return () => clearInterval(time);
  }, [isIds]);

  useEffect(() => {
    async function getPerformancePrometeus() {
      const cycles = await getCycleForDay(isIds);
      setCycleOfPrometeusToDay(cycles);

      console.log(cycles);
    }
    const time = setInterval(() => {
      getPerformancePrometeus();
    }, 2000);

    return () => clearInterval(time);
  }, [isIds]);

  //devices error, now i need answer how can i get one informations
  return (
    <main className=' w-full pl-[20%]'>
      <section className=' grid grid-cols-2 px-8 py-4 gap-2'>
        <section className=' w-2/3 rounded flex flex-col gap-2 p-2'>
          {isWelding
            ? isWelding.map((device, index) => (
                <InitialGraph device={device} key={index} />
              ))
            : null}
        </section>
        <section className=' w-1/3 flex flex-col gap-2 p-2'>
          {isCycleOfPrometeusToDay
            ? isCycleOfPrometeusToDay.map((device, index) => (
                <GraphCycleToDay isCycleOfPrometeusToDay={device} key={index} />
              ))
            : null}
        </section>
      </section>
    </main>
  );
};

export default Home;
