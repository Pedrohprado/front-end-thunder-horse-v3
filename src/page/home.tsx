import InitialGraph from '../components/initalgraph';
import StatusDevices from '../components/statusdevices';
import TableLastOperations from '../components/tablelastoperations';

const Home = () => {
  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8  py-4 gap-2'>
        <div className=' w-full flex items-center justify-between  h-1/2 gap-2'>
          <InitialGraph />
          <StatusDevices otherpage={false} />
        </div>
        <TableLastOperations />
      </section>
    </main>
  );
};

export default Home;
