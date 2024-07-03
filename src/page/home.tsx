import { useEffect, useState } from 'react';
import InitialGraph from '../components/initalgraph';
import {
  TypeDevice,
  TypePerformancePrometeus,
  TypeResumeDevice,
} from '../types/TypeDevice';
import { getAllDevices, getLastWeldBead } from '../api/api';

const Home = () => {
  const [isInfoDevice, setInfoDevice] = useState<[] | TypeResumeDevice[]>([]);
  const [isIds, setIds] = useState<string>('');
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
      setInfoDevice(arr);
    }

    getInfoDevices();
  }, []);

  useEffect(() => {
    async function getPerformancePrometeus() {
      const data = await getLastWeldBead(isIds);
      setWelding(data);
      console.log(data);
    }

    const time = setInterval(() => {
      getPerformancePrometeus();
    }, 2000);

    return () => clearInterval(time);
  }, [isIds]);

  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8  py-4 gap-2'>
        {isWelding
          ? isWelding.map((device) => <InitialGraph device={device} />)
          : null}
      </section>
    </main>
  );
};

export default Home;
